import { Component } from '@angular/core';

import Phaser from 'phaser';

//todo: 
/**
 * 1. btn 
 * 2. event 
 * 3. health bar
 * 4. stream event 
 */

class GameScene extends Phaser.Scene {
  monie: Phaser.GameObjects.Sprite;
  graphics: Phaser.GameObjects.Graphics;
  health;
  hUnger;
  mood;
  healthText: Phaser.GameObjects.Text;
  hUngerText: Phaser.GameObjects.Text;
  moodText: Phaser.GameObjects.Text;
  constructor(config) {
    super(config);
  }

  preload() {
    this.load.image('bg', 'assets/img/monie_bg.png');
    this.load.image('shadow', 'assets/img/monie_shadow.png');
    this.load.image('feed', 'assets/icon/feed.png');
    this.load.image('play', 'assets/icon/play.png');
    this.load.image('dress', 'assets/icon/dress.png');
    this.load.image('shirt', 'assets/icon/shirt.png');
    this.load.image('shop', 'assets/icon/shop.png');
    this.load.path = 'assets/animations/';
    this.load.image('happy1', 'happy-1.png');
    this.load.image('happy2', 'happy-2.png');
    this.load.image('happy3', 'happy-3.png');
    this.load.image('happy4', 'happy-4.png');
    this.load.image('eat1', 'eat-1.png');
    this.load.image('eat2', 'eat-2.png');
    this.load.image('eat3', 'eat-3.png');
    this.load.image('eat4', 'eat-4.png');
    this.load.image('sad1', 'sad-1.png');
    this.load.image('sad2', 'sad-2.png');
    this.load.image('sad3', 'sad-3.png');
    this.load.image('sad4', 'sad-4.png');
    this.load.image('sleep1', 'sleep-1.png');
    this.load.image('sleep2', 'sleep-2.png');
    this.load.image('sleep3', 'sleep-3.png');
  }

  create() {
    this.add.image(200, 360, 'bg').setScale(0.6);
    this.graphics = this.add.graphics();
    this.healthText = this.add.text(10, 10, 'health:', { font: '18px Arial', color: '#000000' });
    this.hUngerText = this.add.text(10, 35, 'hunger:', { font: '18px Arial', color: '#000000' });
    this.moodText = this.add.text(10, 60, 'mood:', { font: '18px Arial', color: '#000000' });

    var feed = this.add.image(window.innerWidth - 50, window.innerHeight - 320, 'feed');
    // feed.setScale(0.9);
    var play = this.add.image(window.innerWidth - 50, window.innerHeight - 230, 'play');
    // play.setScale(0.9);
    var dress = this.add.image(window.innerWidth - 50, window.innerHeight - 150, 'dress');
    feed.setInteractive();
    play.setInteractive();
    dress.setInteractive();

    feed.on('pointerdown', this.clickHandler, { context: this, action: 'feed' });
    play.on('pointerdown', this.clickHandler, { context: this, action: 'play' });
    dress.on('pointerdown', this.clickHandler, { context: this, action: 'dress' });

    this.events.on('animate', this.animateHandler, this);
    this.events.on('interact', this.interactHandler, this);

    // Animation set

    this.anims.create({
      key: 'idle',
      frames: [
        { key: 'happy1' },
        { key: 'happy1' },
        { key: 'happy1' },
        { key: 'happy1', duration: 50 }
      ],
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'feed',
      frames: [
        { key: 'eat1' },
        { key: 'eat2' },
        { key: 'eat3' },
        { key: 'eat4', duration: 100 }
      ],
      yoyo: true,
      frameRate: 8,
      repeat: 2
    });

    this.anims.create({
      key: 'play',
      frames: [
        { key: 'happy1' },
        { key: 'happy2' },
        { key: 'happy3' },
        { key: 'happy4', duration: 100 }
      ],
      yoyo: true,
      frameRate: 8,
      repeat: 2
    });

    this.anims.create({
      key: 'sleep',
      frames: [
        { key: 'sleep1', duration: 100 },
        { key: 'sleep2', duration: 100 },
        { key: 'sleep3', duration: 100 },
        { key: 'sleep1', duration: 200 }
      ],
      yoyo: true,
      frameRate: 8,
      repeat: -1
    });

    this.add.image(window.innerWidth * 2 / 3, 25, 'shop');
    this.add.image(window.innerWidth / 2, window.innerHeight / 2 + 220, 'shadow');
    this.monie = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2 + 70, 'idle');
    this.monie.setScale(window.innerWidth / (218 * 2.2));
    this.monie.play('sleep');



    this.health = 80;
    this.hUnger = 70;
    this.mood = 65
    this.setBarVal('health', this.health);
    this.setBarVal('hUnger', this.hUnger);
    this.setBarVal('mood', this.mood);
  }

  animateHandler(arg0: string, handler: any, arg2: this) {
    this.monie.play(arg0);
  }

  interactHandler(arg0: string, handler: any, arg2: this) {
    switch (arg0) {
      case 'feed':
        this.tweens.addCounter({
          from: this.hUnger,
          to: this.hUnger + 5,
          duration: 500,
          ease: Phaser.Math.Easing.Sine.InOut,
          onUpdate: tweens => {
            const val = tweens.getValue();
            this.setBarVal('hUnger', val)
          }
        })
        this.hUnger = this.hUnger + 5;

        this.tweens.addCounter({
          from: this.health,
          to: this.health + 5,
          duration: 500,
          ease: Phaser.Math.Easing.Sine.InOut,
          onUpdate: tweens => {
            const val = tweens.getValue();
            this.setBarVal('health', val)
          }
        })
        this.health = this.health + 5;
        break;
      case 'play':
        this.tweens.addCounter({
          from: this.mood,
          to: this.mood + 5,
          duration: 500,
          ease: Phaser.Math.Easing.Sine.InOut,
          onUpdate: tweens => {
            const val = tweens.getValue();
            this.setBarVal('mood', val)
          }
        })
        this.mood = this.mood + 5;

        this.tweens.addCounter({
          from: this.health,
          to: this.health + 5,
          duration: 500,
          ease: Phaser.Math.Easing.Sine.InOut,
          onUpdate: tweens => {
            const val = tweens.getValue();
            this.setBarVal('health', val)
          }
        })
        this.health = this.health + 2;
        break;
      case 'dress':
        this.add.image(window.innerWidth / 2, window.innerHeight / 2 + 120, 'shirt').setScale(0.9);
        this.tweens.addCounter({
          from: this.health,
          to: this.health + 5,
          duration: 500,
          ease: Phaser.Math.Easing.Sine.InOut,
          onUpdate: tweens => {
            const val = tweens.getValue();
            this.setBarVal('health', val)
          }
        })
        this.health = this.health + 2;
        break;
      default:
        return;
    }
  }

  clickHandler(arg0: string, clickHandler: any, context: string) {
    let that = this as any;
    that.context.events.emit('animate', that.action);
    that.context.events.emit('interact', that.action);
  }

  setBarVal(type, val) {
    const width = 150;
    const percent = Phaser.Math.Clamp(val, 0, 100) / 100;
    console.log(percent);
    switch (type) {
      case 'health':
        //this.graphics.clear();
        this.healthText.setText('health:' + percent * 100 + "%");
        this.graphics.fillStyle(0xffffff);
        this.graphics.fillRoundedRect(10, 10, width, 20, 5);
        this.graphics.fillStyle(0x00ff00);
        this.graphics.fillRoundedRect(10, 10, width * percent, 20, 5);
        break;
      case 'hUnger':
        //this.graphics.clear();
        this.hUngerText.setText('hunger:' + percent * 100 + "%");
        this.graphics.fillStyle(0xffffff);
        this.graphics.fillRoundedRect(10, 35, width, 20, 5);
        this.graphics.fillStyle(0xF1C232);
        this.graphics.fillRoundedRect(10, 35, width * percent, 20, 5);
        break;
      case 'mood':
        //this.graphics.clear();
        this.moodText.setText('mood:' + percent * 100 + "%");
        this.graphics.fillStyle(0xffffff);
        this.graphics.fillRoundedRect(10, 60, width, 20, 5);
        this.graphics.fillStyle(0x6FA8DC);
        this.graphics.fillRoundedRect(10, 60, width * percent, 20, 5);
      default:
        return;
    }
  }

}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: 'arcade'
      },
      parent: 'game',
      scale: {
        mode: Phaser.Scale.ENVELOP
      },
      scene: GameScene
    };
  }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
  }
}
