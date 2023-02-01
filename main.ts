function score_update () {
    OLED.clear()
    OLED.writeStringNewLine("score:" + score)
    OLED.newLine()
    OLED.writeStringNewLine("lives:" + lives)
    OLED.newLine()
    OLED.writeStringNewLine("rounds:" + rounds)
}
input.onButtonPressed(Button.A, function () {
    sprite.change(LedSpriteProperty.X, -1)
})
input.onButtonPressed(Button.AB, function () {
    sprite.change(LedSpriteProperty.Y, -1)
})
input.onButtonPressed(Button.B, function () {
    sprite.change(LedSpriteProperty.X, 1)
})
input.onGesture(Gesture.Shake, function () {
    sprite.change(LedSpriteProperty.Y, 1)
})
let sprite_2: game.LedSprite = null
let sprite: game.LedSprite = null
let score = 0
let lives = 0
let rounds = 0
OLED.init(128, 64)
rounds = 0
lives = 3
score = 0
sprite = game.createSprite(2, 2)
basic.forever(function () {
    if (0 < lives) {
        sprite_2 = game.createSprite(randint(0, 4), randint(0, 4))
        if (10 >= score) {
            basic.pause(5000)
        } else if (20 >= score) {
            basic.pause(500)
            basic.pause(2000)
        } else if (30 >= score) {
            basic.pause(1000)
        } else {
            basic.pause(500)
        }
        if (sprite.isTouching(sprite_2)) {
            rounds += 1
            score += 1
        } else {
            lives += -1
        }
        score_update()
        sprite_2.delete()
    } else {
        sprite.delete()
        basic.showString("Game over")
    }
})
