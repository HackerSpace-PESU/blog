---
title: Linux
---

::: tip
This article was written by Dev, who you can find on our discord server!
:::

Contraty to popular belief, Linux is no longer a hackerman operating system. You do not need to type _long sofisticated_ commands in the terminal to install a software or get any work done, if you choose not to (but trust me it is worth using the terminal as it makes your life easier). Most computers today run Linux, even if doesn't seem obvious, Android uses the Linux kernel, most web servers run Linux etc. 

<div class="tenor-gif-embed" data-postid="15488308" data-share-method="host" data-aspect-ratio="3.5" ><a href="https://tenor.com/view/rjtonamen-besame-gian-varela-feid-ecko-gif-15488308">Rjtonamen Besame GIF</a>from <a href="https://tenor.com/search/rjtonamen-gifs">Rjtonamen GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
<br/>

## Why use Linux over Windows?

- Most Linux distributions are free and open source (FOSS). Some are even 100% FOSS.
- Windows is a very heavy operating system with a ton of bloat and a overhead. This makes it slow on most old machines and even new ones that don't have a SSD. There's almost always a linux distribution that will run well on old hardware.
- Windows decides to update itself whenever it feels like. This can hurt what you are doing and slow your machine to an unusable state.
- Linux has better and advanced filesystems(FS) including, but not limited to, BTRFS, ZFS, XFS etc. EXT4, the default FS on most distributions, which is over a decade old is better than NTFS (Windows' default FS), which is almost 2 decades old at this point. Newer filesystems like BTRFS support loseless compression algorithms that allow you to store more data than your raw capacity, with very minimal CPU overhead. This also increases the lifespan of disks.
- Package manager out of the box.
- More privacy. No data, including, but not limited to, telemetry, location, usage etc is collected if you choose. Windows on the other hand only allows you to opt out of "optional" telemetry data collection.

!["Windows Update"](/img/domains/linux/101/windows_update.jpg)

## But but gaming?

If you are a person who plays mostly single player games, rejoice. With Valve's proton and other community projects like Lutrius and PlayOnLinux most of single player games work just fine on Linux. In fact some games run better on Linux than on Windows. With proton, Valve has covered roughly about 90-95% of steams game library and with the recent annoucement of Steam Deck, they plan to get 100% of the steam library working on Linux by the end of 2021. You can check how well your favorite game runs on linux on [protondb](https://protondb.com).

!["ProtonDB"](/img/domains/linux/101/protondb.png)

## Convinced to switch to Linux or at least give it a try? Here are a few distros to get started with

- [Linux Mint](https://linuxmint.com/)  
A distribution based on Ubuntu that looks and feels similar to windows 7 with its homegrown Cinnamon desktop environment. Windows users feel at home when using it. It also has access to all the Ubuntu softwares and drivers.

- [Pop!_OS](https://pop.system76.com/)  
If you have a Nvidia GPU or are just tired of the Windows look, you should definitely try Pop!_OS. With excellent support for Nvidia GPUs out of the box, Pop!_OS is a no-brainer for someone interested in using Linux, but not wanting to spend time getting the GPU to work. With the recent introduction of the COSMIC desktop environment, Pop!_OS seems to have something up its sleeves.

Other popular linux distributions include Ubuntu, Manjaro, Garuda, Fedora, Arch etc.

## My personal setup

I have been daily driving Arch Linux for over 2 years now. It is a fantastic distribution IMO. I love the minimalism it offers along with the fact that it is a rolling release distro (no update has broken anything for me, yet). Arch wiki is just great. It is well maintained and is one of the best documentations out there. Pacman is Arch's package manager and it is excellent. With the recent introduction of parallel downloads in Pacman 6.0, it is better than it ever was, nothing short of amazing. AUR (Arch User Repository) is phenomenal. If a software is not present in the official repositories, there is a high chance that it is present in the AUR.  
My DE of choice is GNOME and I keep switching between it and i3-gaps.

<I use arch btw meme xD>
