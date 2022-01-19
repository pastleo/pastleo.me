---
title: ArchLinux 2020 安裝筆記
thumbnail: https://i.imgur.com/kuaCP4Ph.jpg
createdAt: 2020/07/19
---

## 基本上請照著官方教學做： https://wiki.archlinux.org/index.php/installation_guide

這邊提供一些結論等級的東西讓我自己安裝起來更加迅速不用一直翻文件

## [製作 USB 安裝碟並開機到 archiso](https://wiki.archlinux.org/index.php/installation_guide#Boot_the_live_environment)

* 官方 iso 下載點: https://www.archlinux.org/download/
* from Windows:
  * Easy2Boot: https://www.easy2boot.com/download/
  * UNetbootin: https://unetbootin.github.io/
* from macOS:
  * UNetbootin: https://unetbootin.github.io/
* from Linux:
  * `dd`: https://wiki.archlinux.org/index.php/USB_flash_installation_medium#Using_basic_CLI_utilities
  * 我寫的 `create_arch_media.sh`: https://gist.github.com/pastleo/b95cfa7160d5ecc5380fbebbde5d5d13
    * 建立的 USB 可以作為一般隨身碟放其他檔案，這個 script 會同時把 ArchLinux `.iso` 檔放進去

> 有需要可以參考 Arch wiki: https://wiki.archlinux.org/index.php/USB_flash_installation_medium

## 開機到 archiso 之後，需要[連線到網路](https://wiki.archlinux.org/index.php/installation_guide#Connect_to_the_internet)

有線網路理論上會自動使用 DHCP；如果用 WIFI 可以用這些指令連上網：

```bash
iw dev # 列出並確認 wifi 網路卡的名稱，例如 "wlp108s0"
ip link set wlp108s0 up # 啟動網路卡
iw dev wlp108s0 scan | less # 掃描周圍的 WIFI 基地台，搜尋 `SSID` 的字眼
wpa_supplicant -B -i wlp108s0 -c <(wpa_passphrase SSID PASSWORD) # 連到 WIFI，記得把 `SSID`, `PASSWORD` 替換
dhcpcd wlp108s0 # 啟動 dhcp 服務取得 IP
ping archlinux.org # 檢查網路是否可用
```

> WIFI 部份有需要可以參考 https://wiki.archlinux.org/index.php/Wireless_network_configuration 以及 https://wiki.archlinux.org/index.php/WPA_supplicant
 
> Arch wiki 有提供 [離線安裝的方法](https://wiki.archlinux.org/index.php/Offline_installation)，基本上就是從 archiso 開機完的系統複製所有東西到硬碟上
> 但是我還是需要 `grub` 作為 bootloader ，這個得透過網路來安裝，而且這樣的系統什麼功能都沒有...
>> 基本上網路是必須的

## [檢查開機模式是 UEFI 或 BIOS](https://wiki.archlinux.org/index.php/installation_guide#Verify_the_boot_mode)

```bash
ls /sys/firmware/efi/efivars
```

如果資料夾不存在，則表示開機模式是 BIOS (legacy)

> 如果可以，建議使用 [UEFI](https://zh.wikipedia.org/wiki/%E7%B5%B1%E4%B8%80%E5%8F%AF%E5%BB%B6%E4%BC%B8%E9%9F%8C%E9%AB%94%E4%BB%8B%E9%9D%A2) 開機，這是一個相較 BIOS 新的開機規格，比較明顯的優勢就是 UEFI 有提供類似開機選項功能，安裝完 ArchLinux 後安裝 Windows 時不會把 ArchLinux 的 bootloader 覆寫掉，只需要去主機板設定（一直以來我們叫它 BIOS 設定）修改預設開機選項即可

## [建立](https://wiki.archlinux.org/index.php/installation_guide#Partition_the_disks)，[格式化 (format)](https://wiki.archlinux.org/index.php/installation_guide#Format_the_partitions)，[掛載 (mount)](https://wiki.archlinux.org/index.php/installation_guide#Mount_the_file_systems) 磁碟分割 (partition)

### for UEFI

`fdisk /dev/sdX` (or `nvme0nN` / `vdX`), 建立 [**`gpt`** partition table](https://zh.wikipedia.org/wiki/GUID%E7%A3%81%E7%A2%9F%E5%88%86%E5%89%B2%E8%A1%A8), 接著建立這些 partition:

* 1MB `BIOS Boot`, 必須是第一個 partition
  * 這個是為了向下相容讓 BIOS 模式能夠在 `gpt` partition table 上開機
  * 在 `fdisk` 中，按下 `t` 設定磁碟類別
  * 不過不需要對這個磁區格式化，也不需要掛載，之後 `grub-install ...` 時會自動寫入這個磁區
* 256MB `EFI System`
  * 這個磁區用來存放 UEFI 系統的資料，例如開機選單的項目
  * `mkfs.fat -F32 /dev/XXX2`, 格式化 `EFI system` 成 FAT32 filesystem
  * 掛載到 `/boot/efi`
* swap, `/`, `/home`...等 partition

> 想要使用 `dos` partition table 是可以的，就會變成不需要 `BIOS Boot` partition，但是根據 UEFI 標準建議使用 `gpt` partition table

### for BIOS

`fdisk /dev/XXX`, 建立 [**`dos`** partition table](https://zh.wikipedia.org/wiki/%E4%B8%BB%E5%BC%95%E5%AF%BC%E8%AE%B0%E5%BD%95), 接著直接建立 swap, `/`, `/home`...等 partition

> 如果想要使用 `gpt` partition table，就得建立上面提到的 `BIOS Boot` partition，要不然會遇到[這個問題](https://superuser.com/questions/903112/grub2-install-this-gpt-partition-label-contains-no-bios-boot-partition)

## [The `pacstrap` installation](https://wiki.archlinux.org/index.php/installation_guide#Installation)

`pacstrap /mnt ...` 這個指令透過安裝最基本的套件把 ArchLinux 安裝到 `/mnt` 下，但是我通常會直接在 `pacstrap` 的時候就把需要的套件都安裝好

* 所謂最基本的套件: `base linux linux-firmware`
* CPU [microcode](https://wiki.archlinux.org/index.php/Microcode)
  * for intel: `intel-ucode`
  * for AMD: `amd-ucode`
* [`networkmanager`](https://wiki.archlinux.org/index.php/NetworkManager)
  * WIFI: `iw`, `wpa_supplicant`
* bootloader `grub`
  * for UEFI mode, 需要 `efibootmgr`
  * 如果有打算做 Windows 雙開機，需要 `os-prober` and `ntfs-3g`
* bluetooth, [pulseaudio](https://zh.wikipedia.org/wiki/PulseAudio) `bluez pulseaudio-alsa pulseaudio-bluetooth`
* GPU drivers: `mesa`
  * [Intel graphics](https://wiki.archlinux.org/index.php/intel_graphics): `xf86-video-intel intel-media-driver libva-intel-driver`
  * [AMDGPU](https://wiki.archlinux.org/index.php/AMDGPU): `xf86-video-amdgpu libva-mesa-driver mesa-vdpau`
* GUI
  * [desktop/login manager](https://wiki.archlinux.org/index.php/display_manager) [`gdm`](https://wiki.archlinux.org/index.php/GDM) / [`sddm`](https://wiki.archlinux.org/index.php/SDDM) / [`lxdm`](https://wiki.archlinux.org/index.php/LXDM)
  * [desktop environment](https://wiki.archlinux.org/index.php/Desktop_environment) [`gnome`](https://wiki.archlinux.org/index.php/GNOME) / [`plasma`](https://wiki.archlinux.org/index.php/KDE) / [`lxde`](https://wiki.archlinux.org/index.php/LXDE)
  * 終端機: `gnome-terminal` / `konsole` / `lxterminal`
  * 瀏覽器: `chromium`, `firefox`
  * 其他應用程式: `dolphin`, `spectacle`, `smplayer`, `libreoffice-still`...
  * 字體 `ttf-freefont ttf-roboto noto-fonts noto-fonts-emoji noto-fonts-cjk`
    * 個人偏好的終端機字體: `adobe-source-code-pro-fonts`
* 基本系統/開發工具: `sudo vim tmux git base-devel`

例如安裝到 intel CPU 的 PC，桌面環境使用 [`KDE plasma`](https://wiki.archlinux.org/index.php/KDE):

```bash
pacstrap /mnt base linux linux-firmware intel-ucode networkmanager iw wpa_supplicant grub efibootmgr os-prober ntfs-3g bluez pulseaudio-alsa pulseaudio-bluetooth mesa xf86-video-intel intel-media-driver libva-intel-driver sddm plasma konsole chromium firefox ttf-freefont ttf-roboto noto-fonts noto-fonts-emoji noto-fonts-cjk adobe-source-code-pro-fonts sudo vim tmux git base-devel
```

### 離線安裝

基本上照著這邊做: https://wiki.archlinux.org/index.php/Offline_installation

* 有些要刪除的檔案在撰文時不存在，忽略即可
* 如果有裝 GUI，[`graphical.target` 需要重設: `systemctl set-default graphical.target`](https://wiki.archlinux.org/index.php/Systemd#Change_default_target_to_boot_into)，否則 GUI 不會在開機的時候自動啟動

## [`genfstab`](https://wiki.archlinux.org/index.php/installation_guide#Fstab) and [`arch-chroot`](https://wiki.archlinux.org/index.php/installation_guide#Chroot)

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

接下來的設定必須在新安裝的系統內進行，我們使用 `arch-chroot` 切換進去：

```bash
arch-chroot /mnt
```

## 啟用服務

```bash
systemctl enable NetworkManager
systemctl enable bluetooth
systemctl enable sddm # or gdm, lxdm
```

## 使用者以及 [Root 帳號密碼](https://wiki.archlinux.org/index.php/installation_guide#Root_password)

```bash
passwd # 設定 root 密碼
useradd pastleo # 請換成自己的慣用使用者名稱
passwd pastleo
mkdir -p /home/pastleo
chown pastleo:pastleo /home/pastleo
visudo # 給 sudo 權限
```

## [Initramfs](https://wiki.archlinux.org/index.php/installation_guide#Initramfs)

通常在 `pacstrap` 時就會順便把這件事完成，但是如果是使用上面提到的離線安裝方式，則需要下這個產生 linux 映像檔

```bash
mkinitcpio -P
```

## [Boot loader](https://wiki.archlinux.org/index.php/installation_guide#Boot_loader) [GRUB](https://wiki.archlinux.org/index.php/GRUB)

### for UEFI

```bash
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=arch
grub-mkconfig -o /boot/grub/grub.cfg
```
 
`--bootloader-id=...` 是在開機選單上這個作業系統的顯示名字

### for BIOS

```bash
grub-install --target=i386-pc /dev/XXX
grub-mkconfig -o /boot/grub/grub.cfg
```

## 重新開機到新系統

* `exit` chroot
* `umount -R /mnt`
* `reboot` 到新作業系統，看是否一切運作正常

如果不能開機，或是有什麼東西不正常，隨時可以再回去用 archiso 開機，把磁碟區掛載起來然後 `arch-chroot` 進去進行修正

---

### 關於 BIOS 模式下 Windows 雙開機

結論：先安裝 Windows，記得保留所有 Windows 建立的 partition，並且等 Windows 把全部的安裝程式以及更新都完成再來安裝 ArchLinux，然後用 grub 複寫 Windows 的 bootloader 並提供開機選單

#### 如果在 BIOS 模式下 ArchLinux 不小心先安裝好了再裝 Windows

Windows 會摧毀 grub bootloader，不過也不用整個重新安裝，就像上面說的一樣再回去用 archiso 開機，把磁碟區掛載起來並 `arch-chroot` 進去再跑一次 `grub-install ...` 即可

#### ArchLinux 與 Windows 雙開機時硬體時鐘時差問題

Windows 在硬體時鐘使用當地時間，而 Linux 使用 UTC，[建議修改 Windows 設定去使用 UTC 時間](https://wiki.archlinux.org/index.php/System_time#UTC_in_windows)，下載這邊寫好的 [`use_utc_time_x86_64.reg`](https://gist.github.com/pastleo/2ce2d3c79dbc75cd521408e790131c0c)並點兩下設定即可
