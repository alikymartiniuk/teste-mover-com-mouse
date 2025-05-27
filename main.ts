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
    ....................8a8aa8a8....................
    .................aaa888aa8a8aaa.................
    ..............aaa8aa8a8aa888aa8aaa..............
    ...........8aa8aa8888a8aa8a8888aa8aa8...........
    ........8888aa8aa8aa8a8aa8a8aa8aa8aa8888........
    .....aaa8aa8aa8888aa8a8aa8a8aa8888aa8aa8aaa.....
    ...aa8888aa8aa8aa8aa888aa888aa8aa8aa8aa8888aa...
    dccaa8aa8aa8888aa8aa8a8aa8a8aa8aa8888aa8aa8aaccd
    bcb888aa8aa8aa8aa8aa8a8aa8a8aa8aa8aa8aa8aa888bcb
    dbbaa8aa8888aa8aa8888a8aa8a8888aa8aa8888aa8aabbd
    dbbaa8aa8aa8aa8888aa8a8aa8a8aa8888aa8aa8aa8aabbd
    dccaa8888aa8aa8aa8aa888aa888aa8aa8aa8aa8888aaccd
    bcbaa8aa8aa8888aa8aa8a8aa8a8aa8aa8888aa8aa8aabcb
    dbb888aa8aa8aa8aa8aa8a8aa8a8aa8aa8aa8aa8aa888bbd
    dbbaa8aa8888aa8aa8aa8a8aa8a8aa8aa8aa8888aa8aabbd
    dccaa8aa8aa8aa8aa8888a8aa8a8888aa8aa8aa8aa8aaccd
    bcbaa8888aa8aa8888aa888aa888aa8888aa8aa8888aabcb
    dbbaa8aa8aa8888aa8aa8a8aa8a8aa8aa8888aa8aa8aabbd
    dbb888aa8aa8aa8aa8aa8a8aa8a8aa8aa8aa8aa8aa888bbd
    dccaa8aa8888aa8aa8aa8a8aa8a8aa8aa8aa8888aa8aaccd
    bcbaa8aa8aa8aa8aa8aa888aa888aa8aa8aa8aa8aa8aabcb
    dbbaa8888aa8aa8aa888ccbbbbcc888aa8aa8aa8888aabbd
    dbbaa8aa8aa8aa888ccbbbbbbbbbbcc888aa8aa8aa8aabbd
    dcc888aa8aa888ccbbbbbccccccbbbbbcc888aa8aa888ccd
    bcbaa8aa888ccbbbbbccbddddddbccbbbbbcc888aa8aabcb
    dbbaa8aaccbbbbbccbddddddddddddbccbbbbbccaa8aabbd
    dbbaaccbbbbcccbddddddddddddddddddbcccbbbbccaabbd
    dcccbbbbcccbdddbccbbbbbbbbbbbbccbdddbcccbbbbcccd
    ccccccccbbbbbbbcbddddddddddddddbcbbbbbbbcccccccc
    bddddddddddddbcddddddddddddddddddcbddddddddddddb
    bbcbdddddddddcbd1111111111111111dbcdddddddddbcbb
    bbbcccccccccccd1bbbbbbbbbbbbbbbb1dcccccccccccbbb
    bbbbdddddddddc11beeeeeeeeeeeeeeb11cdddddddddbbbb
    bbb8aaaaaaa8dc1be3b33b33b33b33beb1cd8aaaaaaa8bbb
    bbb888888888dc1be3b33b33b33b33beb1cd888888888bbb
    bbb833333338dcbbf3b3effffffe33bebbcd833333338bbb
    bbb83ff3ff38dcbbf3bffffffffff3bebbcd83ff3ff38bbb
    bbb83cc3cc38dcbbf3effffffffffebebbcd83cc3cc38bbb
    bbb833333338dcbbf3eeeeeeeeeeeebebbcd833333338bbb
    cbb83ff3ff38dcbbe3b33b33b33b33bebbcd83ff3ff38bbc
    cbb83cc3cc38dcbbe3b33b33b33b33bebbcd83cc3cc38bbc
    ccbbbbbbbbbbdcbbe3b33b33b33feeeebbcdbbbbbbbbbbcc
    .cbbdddddddddcbbe3b33b33b33ffffebbcdddddddddbbc.
    ..cbdbbbdbbbdcbbf3b33b33b33f33febbcdbbbdbbbdbc..
    ...cdbbbdbbbdcbbf3b33b33b33bffeebbcdbbbdbbbdc...
    ....bddddddddcbbf3b33b33b33b33bebbcddddddddb....
    .....bdbbbdddcbbf3b33b33b33b33bebbcdddbbbdb.....
    ......bcccbbbcbbe3b33b33b33b33bebbcbbbcccb......
    `, SpriteKind.house)
tiles.placeOnRandomTile(House_1, assets.tile`tile_casa1`)
scene.cameraFollowSprite(player_1)
