enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const house = SpriteKind.create()
    export const pointer = SpriteKind.create()
    export const Icons = SpriteKind.create()
    export const golpe_player = SpriteKind.create()
    export const mouse = SpriteKind.create()
}
function configurarIcones () {
    IconeA = sprites.create(assets.image`myImage`, SpriteKind.Icons)
    IconAtivo = 0
}
sprites.onCreated(SpriteKind.golpe_player, function (sprite) {
    timer.after(200, function () {
        DelayTiro = 0
    })
    timer.after(500, function () {
        sprites.destroy(sprite)
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.house, function (sprite, otherSprite) {
    if (IconAtivo == 0) {
        IconAtivo = 1
        IconeA.setFlag(SpriteFlag.Invisible, false)
        pauseUntil(() => browserEvents.A.isPressed() || scene.spriteIsFollowingPath(player_1))
        IconAtivo = 0
        IconeA.setFlag(SpriteFlag.Invisible, true)
        if (browserEvents.A.isPressed()) {
            MudarCenario(1)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.pointer, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
})
sprites.onCreated(SpriteKind.mouse, function (sprite) {
    timer.after(500, function () {
        sprites.destroy(sprite)
    })
})
browserEvents.onMouseMove(function (x, y) {
    if (DelayTiro == 0 && browserEvents.MouseRight.isPressed()) {
        DelayTiro = 1
        mouseposition = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.mouse)
        mouseposition.setPosition(x + (scene.cameraProperty(CameraProperty.X) - 80), y + (scene.cameraProperty(CameraProperty.Y) - 60))
        Golpe = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . c c c 3 3 3 3 . . . . 
            . . . . c c c c c 3 3 1 3 . . . 
            . . . c c c c c c c 3 3 1 3 . . 
            . . c c c c c c c c c 3 3 1 3 . 
            . . c c c c c c c c c 3 3 3 3 . 
            . . c c c c c c c c c 3 3 1 3 . 
            . . c c c c c c c c c 3 3 1 3 . 
            . . c c c c c c c c c 3 3 1 3 . 
            . . c c c c c c c c c 3 3 1 3 . 
            . . c c c c c c c c c 3 3 3 3 . 
            . . . c c c c c c c 3 3 3 3 . . 
            . . . . c c c c c 3 3 3 3 . . . 
            . . . . . c c c 3 3 3 3 . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.golpe_player)
        tiles.placeOnTile(Golpe, player_1.tilemapLocation())
        Golpe.follow(mouseposition)
    }
})
sprites.onCreated(SpriteKind.Icons, function (sprite) {
    sprite.setFlag(SpriteFlag.Invisible, true)
    sprite.setFlag(SpriteFlag.GhostThroughWalls, true)
    sprite.z = 10
    sprite.follow(player_1, 250)
})
function criarPlayer () {
    player_1 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . b 5 5 b . . . 
        . . . . . . b b b b b b . . . . 
        . . . . . b b 5 5 5 5 5 b . . . 
        . b b b b b 5 5 5 5 5 5 5 b . . 
        . b d 5 b 5 5 5 5 5 5 5 5 b . . 
        . . b 5 5 b 5 d 1 f 5 d 4 f . . 
        . . b d 5 5 b 1 f f 5 4 4 c . . 
        b b d b 5 5 5 d f b 4 4 4 4 b . 
        b d d c d 5 5 b 5 4 4 4 4 4 4 b 
        c d d d c c b 5 5 5 5 5 5 5 b . 
        c b d d d d d 5 5 5 5 5 5 5 b . 
        . c d d d d d d 5 5 5 5 5 d b . 
        . . c b d d d d d 5 5 5 b b . . 
        . . . c c c c c c c c b b . . . 
        `, SpriteKind.Player)
    player_1.z = 9
}
browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    sprites.destroyAllSpritesOfKind(SpriteKind.pointer)
    pointer = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.pointer)
    pointer.setPosition(x + (scene.cameraProperty(CameraProperty.X) - 80), y + (scene.cameraProperty(CameraProperty.Y) - 60))
    if (tiles.tileAtLocationIsWall(pointer.tilemapLocation())) {
        scene.cameraShake(2, 50)
        sprites.destroy(pointer)
    } else {
        path = scene.aStar(player_1.tilemapLocation(), pointer.tilemapLocation())
        scene.followPath(player_1, path, 250)
    }
})
function MudarCenario (num: number) {
    tiles.setCurrentTilemap(list_scenes[num])
    tileUtil.setWalls(assets.tile`transparency16`, true)
    tiles.placeOnRandomTile(player_1, sprites.dungeon.collectibleInsignia)
}
let path: tiles.Location[] = []
let pointer: Sprite = null
let Golpe: Sprite = null
let mouseposition: Sprite = null
let DelayTiro = 0
let IconAtivo = 0
let IconeA: Sprite = null
let player_1: Sprite = null
let list_scenes: tiles.TileMapData[] = []
list_scenes = [tilemap`level1`, tilemap`level2`]
criarPlayer()
MudarCenario(0)
configurarIcones()
let House_1 = sprites.create(img`
    ....................e2e22e2e....................
    .................222eee22e2e222.................
    ..............222e22e2e22eee22e222..............
    ...........e22e22eeee2e22e2eeee22e22e...........
    ........eeee22e22e22e2e22e2e22e22e22eeee........
    .....222e22e22eeee22e2e22e2e22eeee22e22e222.....
    ...22eeee22e22e22e22eee22eee22e22e22e22eeee22...
    4cc22e22e22eeee22e22e2e22e2e22e22eeee22e22e22cc4
    6c6eee22e22e22e22e22e2e22e2e22e22e22e22e22eee6c6
    46622e22eeee22e22eeee2e22e2eeee22e22eeee22e22664
    46622e22e22e22eeee22e2e22e2e22eeee22e22e22e22664
    4cc22eeee22e22e22e22eee22eee22e22e22e22eeee22cc4
    6c622e22e22eeee22e22e2e22e2e22e22eeee22e22e226c6
    466eee22e22e22e22e22e2e22e2e22e22e22e22e22eee664
    46622e22eeee22e22e22e2e22e2e22e22e22eeee22e22664
    4cc22e22e22e22e22eeee2e22e2eeee22e22e22e22e22cc4
    6c622eeee22e22eeee22eee22eee22eeee22e22eeee226c6
    46622e22e22eeee22e22e2e22e2e22e22eeee22e22e22664
    466eee22e22e22e22e22e2e22e2e22e22e22e22e22eee664
    4cc22e22eeee22e22e22e2e22e2e22e22e22eeee22e22cc4
    6c622e22e22e22e22e22eee22eee22e22e22e22e22e226c6
    46622eeee22e22e22eeecc6666cceee22e22e22eeee22664
    46622e22e22e22eeecc6666666666cceee22e22e22e22664
    4cceee22e22eeecc66666cccccc66666cceee22e22eeecc4
    6c622e22eeecc66666cc64444446cc66666cceee22e226c6
    46622e22cc66666cc64444444444446cc66666cc22e22664
    46622cc6666ccc64444444444444444446ccc6666cc22664
    4ccc6666ccc6444bcc666666666666ccb4446ccc6666ccc4
    cccccccc6666666cb44444444444444bc6666666cccccccc
    64444444444446c444444444444444444c64444444444446
    66cb444444444cb411111111111111114bc444444444bc66
    666cccccccccccd166666666666666661dccccccccccc666
    6666444444444c116eeeeeeeeeeeeee611c4444444446666
    666e2222222e4c16e4e44e44e44e44ee61c4e2222222e666
    666eeeeeeeee4c16e4e44e44e44e44ee61c4eeeeeeeee666
    666eddddddde4c66f4e4effffffe44ee66c4eddddddde666
    666edffdffde4c66f4effffffffff4ee66c4edffdffde666
    666edccdccde4c66f4effffffffffeee66c4edccdccde666
    666eddddddde4c66f4eeeeeeeeeeeeee66c4eddddddde666
    c66edffdffde4c66e4e44e44e44e44ee66c4edffdffde66c
    c66edccdccde4c66e4e44e44e44e44ee66c4edccdccde66c
    cc66666666664c66e4e44e44e44feeee66c46666666666cc
    .c66444444444c66e4e44e44e44ffffe66c44444444466c.
    ..c64eee4eee4c66f4e44e44e44f44fe66c4eee4eee46c..
    ...c4eee4eee4c66f4e44e44e44effee66c4eee4eee4c...
    ....644444444c66f4e44e44e44e44ee66c444444446....
    .....64eee444c66f4e44e44e44e44ee66c444eee46.....
    ......6ccc666c66e4e44e44e44e44ee66c666ccc6......
    `, SpriteKind.house)
tiles.placeOnRandomTile(House_1, assets.tile`tile_casa1`)
scene.cameraFollowSprite(player_1)
