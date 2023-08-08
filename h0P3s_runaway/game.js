var lvl = 0;




const api_url ='http://www.randomnumberapi.com/api/v1.0/random?min=1&max=10&count=50';
const api_url2 ='http://www.randomnumberapi.com/api/v1.0/random?min=0&max=29&count=10';
async function getnumber(){
  const response = await fetch(api_url);
  const response1 = await fetch(api_url2);
  const data1 = await response.json();
  const data1uniq = [... new Set(data1)];
  const data2 = await response1.json();
  const data2uniq = [... new Set(data2)];
  const data = [...data1uniq, ...data2uniq];
  
  
  return data;
  
}

  getnumber()
  .then((randomnumber) =>{

    kaboom({
      
      global: true,
      fullscreen: true,
      scale: 1,
      debug: true,
      clearColor: [0,0,0,0],
      
    })
    
  
     const MOVE_SPEED = 120;
     const ENEMY_SPEED = 60;
     
   
    
     loadRoot('https://i.imgur.com/');
    
      loadSprite('gameover', 'C5YuYzC.png');
      loadSprite('youwin', 'PG5qE88.png');
      loadSprite('mainmenu', 'r1ozcfL.png');
      loadSprite('about', '3iQWNDz.png');
      loadSprite('credits', 'OcKD4gw.png')

      
   
      
     loadSprite('wall1', 'OtVVe2l.png');
     loadSprite('wall-brick1', 'Rhm0hiL.png'); 
     loadSprite('wall2', '5Yba9oF.png');
     loadSprite('wall-brick2', 'MKKhUuu.png');
     loadSprite('wall3', '3fVHW2Q.png'); 
     loadSprite('wall-brick3', 'lcxLTqw.png');
     loadSprite('wall4', 'NPaCOGI.png');
     loadSprite('wall-brick4', 'ohqAuoP.png');    
     loadSprite('wall5', 'UGiWSTl.png'); 
     loadSprite('wall-brick5', 'ydovg1g.png');
     loadSprite('wall6', 'RpMIeYu.png'); 
     loadSprite('wall-brick6', 'FwORrhk.png');
     loadSprite('wall7', '9fAIW1f.png'); 
     loadSprite('wall-brick7', 'UuA0n3A.png');
     loadSprite('wall8', 'j3bDHx2.png'); 
     loadSprite('wall-brick8', 'f08aVmV.png');
     loadSprite('wall9', 'Rnm4pwL.png'); 
     loadSprite('wall-brick9', '3tU149X.png');
     loadSprite('wall10', 'krPyuc9.png'); 
     loadSprite('wall-brick10', '1WYedPP.png');
    
    loadSprite('door', '4Z9Sv3z.png');
    loadSprite('kaboom', 'o9WizfI.png');    
    loadSprite('hope', 'T4uAnqV.png', {
      sliceX: 6,
      sliceY: 4,
      anims: {
        //stoped
        idleLeft: { from: 18, to: 18 },
        idleRight: { from: 6, to: 6 },
        idleUp: { from: 0, to: 0 },
        idleDown: { from: 12, to: 12 },
    
        //move
        moveLeft: { from: 19 , to: 23  },
        moveRigth: { from: 7, to: 11 },
        moveUp: { from: 1, to: 5 },
        moveDown: { from: 13, to: 17 },    
      }
    });
    
    loadSprite('bomb', 'MN3NLLW.png', {
      sliceX: 6,
        anims: {
        move: { from: 0, to: 5 },
        animSpeed: 0.5,
      }
    });
    
    loadSprite('alien', 'cPJGQe0.png', { 
      sliceX: 6,
      sliceY: 2,
        anims: {
        amoveright: { from: 0, to: 5 },
        amoveleft: {from: 6, to: 11},
        animSpeed:0.1,
        frame:12,
      }
    });

    loadSprite('worm', 'KVwcQyJ.png', { 
      sliceX: 6,
      sliceY: 2,
        anims: {
        wmoveleft: { from: 0, to: 5 },
        wmoveright: {from: 6, to: 11},
      }
    });
   
    loadSprite('penguin', 'TpfOP4Y.png', { 
      sliceX: 6,
      sliceY: 2,
        anims: {
        pmoveup: { from: 0, to: 5 },
        pmovedown: {from: 6, to: 11},
      }
     });
    
    loadSprite('explosion', 'ssR2HxH.png', { 
      sliceX: 5,
      sliceY: 5,
    });
   
    scene('game', ({level, score}) => {
      layers(['obj', 'ui'], 'obj');
      
      const TIME_LEFT = 200
    
      const maps = [          
      [ '                          ',
        '                          ',
        '    aaaaaaaaaaaaaaaaaaaaaa',
        '    a   z zz zzzzz   zzz a',
        '    a  a  za  } a  a  azza',
        '    a za &zzzz  z  zzzzzza',
        '    azza  a  azza  a  az a',
        '    a zzzzz  z  zzzzzzzz a',
        '    a za  a  a  azza dazza',
        '    aazzzzzzzz  zzzzz  zza',
        '    a  azzaz a  aaaa  a  a',
        '    a  *   z zzzzzzz     a',
        '    aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                          ',
        '                          ',
        '    aaaaaaaaaaaaaaaaaaaaaa',
        '    a   zzz  zzzza zzzz  a',
        '    a  azza &azza  azza  a',
        '    a  zzzz  zzzz   zzzz a',
        '    azzazzazzazzazzazzazza',
        '    azzzz z*      zdzzzzza',
        '    azza  azz   azza  azza',
        '    az z  zzzz  zzzz  zzza',
        '    a  a  a  a  azzza  a a',
        '    a  zzzz} zzzz  zzzz  a',
        '    aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                          ',
        '                          ',
        '    aaaaaaaaaaaaaaaaaaaaaa',
        '    a   zz zzzzzz    zz  a',
        '    a  a  aaa  az a  a} aa',
        '    azz    zz    zz    zza',
        '    a  azza  azza  a  a  a',
        '    a   zz    zz    zz   a',
        '    a  a  a &a  azza  a  a',
        '    azz    zz     zaz  zza',
        '    a  a  a  a  azza  a  a',
        '    a z zz*   zz    zz d a',
        '    aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                          ',
        '                          ',
        '    aaaaaaaaaaaaaaaaaaaaaa',
        '    a         *zzzzzz    a',
        '    a za  a  a  a  az a  a',
        '    az  zzz zzz    azzz  a',
        '    a  a  az a zazzza  a&a',
        '    a  zzzzz      zzz    a',
        '    a& a  a  a  a  a  a  a',
        '    az       zzzzz       a',
        '    a  a  a  a     a   aza',
        '    a  } zzzzzdzzzzz  *  a',
        '    aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                          ',
        '                          ',
        '    aaaaaaaaaaaaaaaaaaaaaa',
        '    a  zzz    }   zzzz z a',
        '    a  azzazzazzazzadzazza',
        '    a zzazza  *    zzzz  a',
        '    a  azzazzazzazzazzazza',
        '    a& zzaza       zzzz  a',
        '    a  azza zazzazzazzazza',
        '    a  zzzz    d   zzzz  a',
        '    a  azza zazzazzazzazza',
        '    a  zzzz z      zzzz  a',
        '    aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                          ',
        '                          ',
        '    aaaaaaaaaaaaaaaaaaaaaa',
        '    a  z  z  z     z  z  a',
        '    a  azzazzazzazzazzazza',
        '    a  z     z  z  z  z  a',
        '    azza  a  a  a  a  a  a',
        '    a  z  z  z& z  z  z  a',
        '    a  azzazzazzazzazzazza',
        '    azzz  z z   z  zd z  a',
        '    a  a  a  a  a  a*    a',
        '    a  z  z  z  z  z  }  a',
        '    aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                          ',
        '                          ',
        '    aaaaaaaaaaaaaaaaaaaaaa',
        '    a     zzzzzzz  zdzz  a',
        '    a  azza  azza  azza  a',
        '    a  * zz  *  z &zzzzzza',
        '    azza  azzazzazza  azza',
        '    a  z  zzz      zzzz  a',
        '    a  azzazzazzazzazza  a',
        '    az z  zzzz zzzz }    a',
        '    a  a  azza  azzazzazza',
        '    a  z  zzzz     zzzzzza',
        '    aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                          ',
        '                          ',
        '    aaaaaaaaaaaaaaaaaaaaaa',
        '    a      zzz zzzzzz    a',
        '    a  a za  a  a  a &a  a',
        '    a   zzzzz  } zz      a',
        '    azaa  a  a  a  a  a  a',
        '    a  zzzzz      zzz    a',
        '    a  a  a za  az a za za',
        '    a   z    zzzzz d  *  a',
        '    a  a  a  a  a  a  a  a',
        '    a  zzzzzzzzzz  zz zz a',
        '    aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                          ',
        '                          ',
        '    aaaaaaaaaaaaaaaaaaaaaa',
        '    a          zzzzzz    a',
        '    a  a        a  az  a a',
        '    a   zzzzzzza    z&   a',
        '    a  a  a    a  az a   a',
        '    a  zzzzz  dz  zzz    a',
        '    a  a      a  a  da a a',
        '    a  a }   zzzzz       a',
        '    a  a  a  a  a  *  a  a',
        '    a   zzzzzz  zzzz     a',
        '    aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                          ',
        '                          ',
        '    aaaaaaaaaaaaaaaaaaaaaa',
        '    a     a     zzzzzz zza',
        '    azza  a aa  a  a  &zza',
        '    a   zzzzzzz        zza',
        '    a  a  a  a aa   a azza',
        '    a  zzzzz      zzz  zza',
        '    a  a  a  a  a aa  azza',
        '    a     }  zzzzz   a zza',
        '    a  aaaa  a  a aa  azza',
        '    a   *   d          zza',
        '    aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                          ',
        '                          ',
        '    aaaaaaaaaaaaaaaaaaaaaa',
        '    a   zzz           d  a',
        '    aa a  a  a  a  a  a  a',
        '    a z zzzz   *    a    a',
        '    a& a  a  a  azza  a  a',
        '    a  zzzzz   }  zzz    a',
        '    a  a  a  azza  az azza',
        '    azz     zzzzz  zzzzzza',
        '    a  a  a  a  a  a z   a',
        '    a   zz    zz zzzz  z a',
        '    aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                          ',
        '                          ',
        '    aaaaaaaaaaaaaaaaaaaaaa',
        '    a      zzz  *  zzzzzza',
        '    a  a  a  a za  a  a  a',
        '    a   zzzzzzz        z a',
        '    a  a  a  a  a  a  a& a',
        '    a  zzzzz      zzz    a',
        '    a  a  a  a  a  a  az a',
        '    az z     zzzzzdzz    a',
        '    azza  a  a  a  a  a  a',
        '    a     zzzz    }      a',
        '    aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                          ',
        '                          ',
        '    aaaaaaaaaaaaaaaaaaaaaa',
        '    a     zz      zz     a',
        '    a                    a',
        '    a    zzzz    zzzz    a',
        '    a    azza    azza    a',
        '    a                    a',
        '    a  azzazazzazzazzza  a',
        '    a &a    *   d  }  a& a',
        '    a  azzazzazzazzazza  a',
        '    a                    a',
        '    aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                          ',
        '                          ',
        '    aaaaaaaaaaaaaaaaaaaaaa',
        '    a     z     }     zzza',
        '    a  a  azza  a  a  a  a',
        '    a     z  zzzz     z  a',
        '    azzazza  azza  a  a  a',
        '    a   *    z        z  a',
        '    a  a  a  a  a  a  a  a',
        '    a           z &      a',
        '    a  a  a  a  azza  a  a',
        '    a           zzdz     a',
        '    aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a     zzzzzzzzzzzzzzza',
        '   a  a  a  a  a  a  adza',
        '   a    zz     *     zzza',
        '   a  a  azza  a  a  a  a',
        '   a     zz   }      z  a',
        '   azzazza  a  azzazza  a',
        '   a     zzzzz        & a',
        '   a  a  a  a  a  a  a  a',
        '   a     zzzz  zzz  zz  a',
        '   aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a     zzzzzzzzzz     a',
        '   a  a  a  a  a  a  a  a',
        '   a     z  zzzz     *  a',
        '   a  a  a  a  a  a  a  a',
        '   azzzzzzzzz &   zzzz  a',
        '   a  a  a  a  a  a da  a',
        '   a    }      zzzzzzz  a',
        '   a  a  azza  a  a  a  a',
        '   a        zzzzzzzzzz  a',
        '   aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a        zzzz  zzzz  a',
        '   a  a  a  a  a  a  a  a',
        '   a     zzzzzzz     z  a',
        '   a  a  a  a  a  a  a  a',
        '   a    &z     zzzzzzz  a',
        '   azzazza  a  a  a  a  a',
        '   a    }   z    *    d a',
        '   a  a  a  a  a  a  a  a',
        '   a  zzzzzzz           a',
        '   aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a     zzzzzzzzzz     a',
        '   a  a  a  a  a  a  a  a',
        '   a     *     z  zzzzzza',
        '   a  a  a  azza  a  a  a',
        '   a &      zzzz        a',
        '   a  a  azza  a  a  a  a',
        '   azzzzzz    }   zzzz  a',
        '   azza  a  a  a  a  a  a',
        '   adzz                 a',
        '   aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a     z     zzzzzzz  a',
        '   a  a  a  a  a  a  a  a',
        '   a     z  *     zzzzzza',
        '   a  a  a  azza  a  a  a',
        '   a  zzzz    dz    }   a',
        '   a  a  a  azza  a  a  a',
        '   a &   zzzz  zzzz     a',
        '   a  a  a  a  a  a  a  a',
        '   a  zzzz  zzzz    zzzza',
        '   aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a     zzzzzzz  zzzz  a',
        '   a  a  azza  a  a  a  a',
        '   a     z  z  *  zzzz  a',
        '   azzazzazza  a  a  a  a',
        '   a  zzzzzzzzzzzzz     a',
        '   a  a  a  a  a  a  a &a',
        '   a     }        zzzzzza',
        '   a  a  a  a  a  a  a  a',
        '   azzz     dzzzzzz     a',
        '   aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a          *         a',
        '   azzazzazzazzazzazzazza',
        '   a    }         zzzzzza',
        '   a  a  a  a  a  a  a  a',
        '   a     zzzzzzzzzzzzzzda',
        '   a  a  a  a  a  a  a  a',
        '   a     z        z     a',
        '   a &a  a  a  a  a  a  a',
        '   a     zzzz     zzzz  a',
        '   aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a                    a',
        '   a  a  a  a  a  a  a  a',
        '   a         *          a',
        '   a  a  a  a  a  a  a  a',
        '   a        }           a',
        '   a  a  a  a  a  a  a  a',
        '   a                    a',
        '   a &a  a  a  a  a  d& a',
        '   a                    a',
        '   aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a  zzzzzzzzzzzzzzzzzza',
        '   a  azza  a  a  a  a  a',
        '   a  zzzz     *        a',
        '   a  azza  a  a  a  a  a',
        '   a     zzzz    }   zzza',
        '   a  a  a  a  a  a  a  a',
        '   a        z     zzzz  a',
        '   a &a  a  azza  a  a  a',
        '   a  zzzzzzzzzzzzzzzzd a',
        '   aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a     zzzzzzzzzzzzzz a',
        '   azza  a  a  a  a  a  a',
        '   a     z       }      a',
        '   a  a  a  a  a  a  a  a',
        '   a     z   dzzzzzzzzzza',
        '   azza  azzazza  azza  a',
        '   a  z&&z           z  a',
        '   azza  azzazzazzazza  a',
        '   a         *       zzza',
        '   aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a        zzzzzzzzzzzza',
        '   a  a  a  azzazzazzazza',
        '   a     z     }  z     a',
        '   a  a  a  a  azzazzazza',
        '   a  zzzzzzz  z  zzzzzza',
        '   a  a  a  a  a  azzazza',
        '   a       *   z&&z     a',
        '   a  a  a  a  a  azzazza',
        '   azzzzzzzzzzzzzzzzzz da',
        '   aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a            zz      a',
        '   a  a  a  a  a  a  a  a',
        '   a         zz    zz   a',
        '   a  a  a  a  a  a  a  a',
        '   a      zz      *   zza',
        '   a &a  a  a  a  a  a  a',
        '   a   zz    zz  d   zz a',
        '   a  a  a  a  a  a  a  a',
        '   azz     }    zz      a',
        '   aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a     zzzzzzzzzzzzzzza',
        '   a  a  a  azzazzazzazza',
        '   a        zzzzzzzzzzzza',
        '   a  a  a  azzazzazzazza',
        '   a    }   zzzzzzzzzzzza',
        '   a &a  a  a  azzazzazza',
        '   a   z       zzzzzzzzza',
        '   a  a  a  a  azzazzazza',
        '   ad     *    zzzzzzzzaa',
        '   aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a    zzzzz  z    z   a',
        '   a  a  azza  azzazzazza',
        '   a    zzzzz &z  zzzz  a',
        '   a  a  azza  a  a  a  a',
        '   a  } zzzzz  z  zzzzzza',
        '   a  a  azzazza  a  a  a',
        '   a    zzzzz  z   *    a',
        '   a  a  azza  a  a  azza',
        '   a    zzzzz  z     zd a',
        '   aaaaaaaaaaaaaaaaaaaaaa',
      ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a     z     z     z  a',
        '   a  a  a  a  a  a  a  a',
        '   a     z  z  z  z  z  a',
        '   a  a  a  a  a  a  a  a',
        '   a  z     z     }     a',
        '   a  a  a  a  a  a  a  a',
        '   a &   z     z     z  a',
        '   a  a  a  a  a  a  a  a',
        '   a        *        zd a',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        ],
      [ '                         ',
        '                         ',
        '   aaaaaaaaaaaaaaaaaaaaaa',
        '   a                    a',
        '   a  a  a  a  a  a  a  a',
        '   a       }            a',
        '   a  a  a  a  a  a  a  a',
        '   a           *        a',
        '   a  a  a  a  azzazzazza',
        '   a           zzzzzzzzza',
        '   a  a  a  a  azzazz   a',
        '   a         & dzzzzz  za',
        '   aaaaaaaaaaaaaaaaaaaaaa',
      ],
    ]
     
     function changeaspect(a){
      
      for (let i = 1; i <=10; i++) {
        
        if(randomnumber[lvl] == i){          
          if( a == 1){
            return[sprite('wall'+ i), 'wall', solid(), 'wall']
          }
          else if(a == 2){
            return[sprite('wall-brick'+ i), 'wall-brick', solid(), 'wall']
          }
          else if(a == 3){          
            
            return [sprite('wall-brick'+ i), 'wall-brick-dool', solid(), 'wall']
          }   
        }
      }
    } 

      const levelCfg = {
        width :51,
        height: 51,   

      a: changeaspect(1),      
      z: changeaspect(2),
      d: changeaspect(3),
      t: [sprite('door'), 'door', 'wall'],    
      '}': [sprite('worm'), 'dangerous', 'worm', { dir: -1, timer: 0 }],
      '&': [sprite('penguin'), 'penguin', { dir: -1 }, 'dangerous', { timer: 0 }],    
      '*': [sprite('alien'), 'alien', { dir: -1 }, 'dangerous', { timer: 0 }],
 
      }

      const gameLevel = addLevel(maps[level], levelCfg);
 
      const scoreLabel = add([
        text('Score: ' + score),
        pos(400, 30),
        layer('ui'),
        {
          value: score,
        },
        scale(2)
      ])

      const timer = add([
        text('0'),
        pos(675,65),
        scale(2),
        layer('ui'),
        {
          time: TIME_LEFT,
        },
      ])
        
      timer.action(() =>  {
        timer.time -= dt()
        timer.text = timer.time.toFixed(0)
        if (timer.time <= 0 ) {
          go('lose', { score: scoreLabel.value })
        }
      })

      add([text('Level: ' + parseInt(lvl + 1)), pos(800, 30), scale(2)])
    
      const player = add([
        sprite('hope', {
          animSpeed: 0.1,
          frame: 12,
        }),
        pos(270,170),
        { dir: vec2(1,0),
          can_boomb: true,
        },
      ])
    
      //ACTION PLAYER
      player.action(() => {

        player.pushOutAll();
          
      })
      
      keyDown('left', () => {
        player.move(-MOVE_SPEED, 0);
        player.dir = vec2(-1, 0);
        
      })
    
      keyDown('right', () => {
        player.move(MOVE_SPEED, 0);
        player.dir = vec2(1, 0);
      })
    
      keyDown('up', () => {
        player.move(0, -MOVE_SPEED);
        player.dir = vec2(0, -1);
      })  
    
      keyDown('down', () => {
        player.move(0, MOVE_SPEED);
        player.dir = vec2(0, 1);
      })   
    
      keyPress('left', () => {
        player.play('moveLeft')
      })
    
      keyPress('right', () => {
        player.play('moveRigth')
      })
    
      keyPress('up', () => {
        player.play('moveUp')
      })  
    
      keyPress('down', () => {
        player.play('moveDown')
      }) 
      
      keyRelease('left', () => {
        player.play('idleLeft')
      })
    
      keyRelease('right', () => {
        player.play('idleRight')
      })
      
      keyRelease('up', () => {
        player.play('idleUp')
      })
    
      keyRelease('down', () => {
        player.play('idleDown')
      })
    
      keyPress('space', () => {
        if(player.can_boomb){
          spawnBomber(player.pos.add(player.dir.scale(0)))
          player.can_boomb = false;
          wait(0.6, () => {
            player.can_boomb = true;
        });
        }
        
      })
    
      //ACTIONS ENEMY
      action('alien', (s) => {
        s.pushOutAll();
        s.move(s.dir * ENEMY_SPEED, 0)
        s.timer -= dt()
       
       
            if(s.dir > 0 && s.curAnim() !== "amoveright"){
          
          s.play("amoveright")
        }
        if(s.dir < 0 && s.curAnim() !== "amoveleft"){
          
          s.play("amoveleft")
        }
        if (s.timer <= 0) {
          s.dir = -s.dir
          
          s.timer = rand(5)
        }
       
       
      })
    
      action('penguin', (s) => {
        s.pushOutAll();
        s.move(0,s.dir * ENEMY_SPEED)
        
        s.timer -= dt()
        
        if(s.dir < 0 && s.curAnim() !== "pmoveup"){
          
          s.play("pmoveup")
        }
        if(s.dir > 0 && s.curAnim() !== "pmovedown"){
          
          s.play("pmovedown")
        }


        if (s.timer <= 0) {
          s.dir = -s.dir
          s.timer = rand(5)
        }
      })  
    
      action('worm', (s) => {
        s.pushOutAll();
        s.move(s.dir * ENEMY_SPEED,0)
        s.timer -= dt()
        
        if(s.dir < 0 && s.curAnim() !== "wmoveright"){
          
          s.play("wmoveright")
        }
        if(s.dir > 0 && s.curAnim() !== "wmoveleft"){
          
          s.play("wmoveleft")
        }



        if (s.timer <= 0) {
          s.dir = -s.dir
          s.timer = rand(5)
        }
      }) 
      
      //FUNCTIONS
    
      function spawnKaboom(p, frame){
        
        const obj = add([
          sprite('explosion', {
            animSpeed: 0.1,
            frame: frame,
          }),
          pos(p),
          scale(1.2),
          'kaboom',
          solid(),
        ])
    
        obj.pushOutAll();
        wait(0.5, () => {
          destroy(obj);
        })
      }
    
      function spawnBomber(p){
        const obj = add([sprite('bomb'), ('move'), pos(p), scale(1.1), 'bomber']);
        
      
        obj.pushOutAll();
        obj.play("move");
    
        
        wait(4, () => {
       
          destroy(obj);
          
    
          obj.dir = vec2(1,0)
          spawnKaboom(obj.pos.add(obj.dir.scale(0)), 12) // center
    
          obj.dir = vec2(0, -1)
          spawnKaboom(obj.pos.add(obj.dir.scale(1)), 2) // up
    
          
          obj.dir = vec2(0, 1)
          spawnKaboom(obj.pos.add(obj.dir.scale(1)), 22) // down
    
          
          obj.dir = vec2(-1, 0)
          spawnKaboom(obj.pos.add(obj.dir.scale(1)), 10) // left
    
          obj.dir = vec2(1, 0)
          spawnKaboom(obj.pos.add(obj.dir.scale(1)), 14) // rigth
    
        })
      }
    
      // COLLISIONS
    
      player.collides('door', (d) => {
        lvl++;
        if(lvl <5){
          go("game", {
            level: (randomnumber[10+lvl]) ,
            score: scoreLabel.value,
          })
       
          
        }
        if(lvl == 5){
          go("win", {
            score: scoreLabel.value,       
          })
        }
        })
        
      
        player.collides('kaboom', (k) => {
        
          go('lose', {score: scoreLabel.value})
          
          }) 
    
      collides('kaboom', 'dangerous', (k,s) => {
        camShake(4);
         wait(1, () => {
           destroy(k)
         })
         destroy(s);
         scoreLabel.value= scoreLabel.value + 10
         scoreLabel.text = 'Score: ' + scoreLabel.value
      })
    
    
      collides('kaboom', 'wall-brick', (k,s) => {
        camShake(4);
         wait(1, () => {
          destroy(k);
         })
         destroy(s);
      })
    
      collides('alien', 'wall', (s) => {
        s.dir = -s.dir;
      })
    
      collides('penguin', 'wall', (s) => {
        s.dir = -s.dir;
      })
    
      collides('worm', 'wall', (s) => {
        s.dir = -s.dir;
      })
    
      collides('kaboom', 'wall-brick-dool', (k,s) => {
        camShake(4);
        wait(1, () => {
          destroy(k);
        })
        destroy(s);
        gameLevel.spawn('t', s.gridPos.sub(0,0))
      })
      
      

      player.collides('dangerous', () => {
        
        go('lose', {score: scoreLabel.value})
      })
    })
    
    

    scene('lose', ( { score } ) => {
        const background1 = add([
          sprite("gameover"),
          pos(width() / 2, height() / 2),
          origin("center"),
          scale(1),
          
        ]);
      add([text('Score: '+ score, 32), origin('center'), pos(width() / 2, height() / 2 + 300)])
      add([text('Press -space- to go to Menu'), origin('center'), pos(width() / 2, height() / 2 + 400)])
    
      keyPress('space', () => {
        go('menu', {  });
      })
    })

    scene('win', ( { score } ) => {
      const background2 = add([
        sprite("youwin"),
        pos(width() / 2, height() / 2),
        origin("center"),
        scale(1),
        
      ]);
    add([text('Score: '+ score, 32), origin('center'), pos(width() / 2, height() / 2 + 300)])
    add([text('Press -space- to go to Menu'), origin('center'), pos(width() / 2, height() / 2 + 400)])
  
    keyPress('space', () => {
      go('menu', { });
    })
  })

    scene('credits', ( {} ) => {
    const background2 = add([
      sprite("credits"),
      pos(width() / 2, height() / 2),
      origin("center"),
      scale(1),
      
    ]);

  add([text('Press -space- to return Menu'), origin('center'), pos(width() / 2, height() / 2 + 400)])

  keyPress('space', () => {
    go('menu', { });
  })
})
    scene('about', ( {  } ) => {
    const background2 = add([
      sprite("about"),
      pos(width() / 2, height() / 2),
      origin("center"),
      scale(1),
      
    ]);
    add([text('Press -space- to return Menu'), origin('center'), pos(width() / 2, height() / 2 + 400)])

  keyPress('space', () => {
    go('menu', {  });
  })
})

scene('menu', ( { } ) => {
  const background2 = add([
    sprite("mainmenu"),
    pos(width() / 2, height() / 2),
    origin("center"),
    scale(1),
   
  ]);

  background2.action(() => {
    
    let playbeg= vec2(width()*0.72968,height()*0.4601)
    let playend= vec2(width()*0.9464,height()*0.5784)

		


		let aboutbeg =vec2(width()*0.6508,height()*0.2512)
    let aboutend =vec2(width()*0.8585,height()*0.3794)

    let creditsbeg =vec2(width()*0.6508,height()*0.6529)
    let creditsend =vec2(width()*0.8585,height()*0.7811)

    const mpos = mousePos();

    
    if(mpos.x > playbeg.x && mpos.x < playend.x && mpos.y > playbeg.y && mpos.y < playend.y){
	
      mouseClick( () => {
        go('game', { level: randomnumber[10], score: 0 });
      }) 
    }
    if(mpos.x > aboutbeg.x && mpos.x < aboutend.x && mpos.y > aboutbeg.y && mpos.y < aboutend.y){
		
      mouseClick( () => {
        go('about', { level: randomnumber[10], score: 0 });
      }) 
    }
    if(mpos.x > creditsbeg.x && mpos.x < creditsend.x && mpos.y > creditsbeg.y && mpos.y < creditsend.y){
      mouseClick( () => {
        go('credits', {  });
      }) 
    }
    
    
});
    



})
  

go('menu', {  });
    



   })
   




