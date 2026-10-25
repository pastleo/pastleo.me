import assert from 'node:assert/strict';
import test from 'node:test';
import { resume, translateJapaneseResume } from '../src/data/resume.ts';

test('Japanese references survive source reordering and unrelated insertions', () => {
  const source = structuredClone(resume.zh);
  for (const section of ['experience', 'achievements', 'talks', 'educations', 'skills', 'showcases']) {
    source[section].reverse();
  }
  for (const experience of source.experience) {
    experience.details?.reverse();
    for (const detail of experience.details ?? []) detail.description?.reverse();
  }
  for (const achievement of source.achievements) achievement.description?.reverse();
  source.showcases.unshift({
    id: 'unrelated-new-project', title: 'Unrelated project',
    thumbnail: '/unrelated.png', href: 'https://example.com/',
  });
  assert.deepEqual(translateJapaneseResume(source), resume.ja);
});

test('each Japanese showcase inherits the matching project assets and destinations', () => {
  for (const showcase of resume.ja.showcases) {
    const source = resume.zh.showcases.find(({ id }) => id === showcase.id);
    assert.ok(source, `Missing source for ${showcase.id}`);
    for (const key of ['thumbnail', 'href', 'git']) {
      assert.equal(showcase[key], source[key], `${showcase.id}.${key}`);
    }
  }
  const website = resume.ja.showcases.find(({ id }) => id === 'pastleo-me');
  assert.equal(website?.title, 'PastLeo.me');
  assert.equal(website?.thumbnail, '/showcase/pastleo-me.jpg');
});

test('missing project, nested detail, or linked description IDs fail clearly', () => {
  const project = structuredClone(resume.zh);
  project.showcases = project.showcases.filter(({ id }) => id !== 'pastleo-me');
  assert.throws(() => translateJapaneseResume(project), /Missing resume entry.*pastleo-me/);

  const detail = structuredClone(resume.zh);
  const freelance = detail.experience.find(({ id }) => id === 'freelance');
  assert.ok(freelance);
  freelance.details = freelance.details?.filter(({ id }) => id !== 'cogini');
  assert.throws(() => translateJapaneseResume(detail), /Missing resume entry.*cogini/);

  const description = structuredClone(resume.zh);
  const book = description.achievements.find(({ id }) => id === 'webgl-book');
  assert.ok(book);
  book.description = book.description?.filter((line) => typeof line === 'string' || line.id !== 'publication');
  assert.throws(() => translateJapaneseResume(description), /Missing resume entry.*publication/);
});

test('duplicate IDs fail instead of ambiguously selecting the first entry', () => {
  const source = structuredClone(resume.zh);
  const website = source.showcases.find(({ id }) => id === 'pastleo-me');
  assert.ok(website);
  source.showcases.push({ ...website, href: 'https://example.com/wrong-project' });
  assert.throws(() => translateJapaneseResume(source), /duplicate resume id "pastleo-me" in showcases/);
});
