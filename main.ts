function score_update () {
    OLED.clear()
    OLED.writeStringNewLine("score:" + score)
    OLED.newLine()
    OLED.writeStringNewLine("lives:" + lives)
    OLED.newLine()
    OLED.writeStringNewLine("rounds:" + rounds)
}
function speed_change () {
    if (speed == 1) {
        basic.pause(500)
        basic.pause(200)
        basic.pause(100)
    } else if (speed == 2) {
        basic.pause(500)
        basic.pause(100)
    } else if (speed == 3) {
        basic.pause(200)
        basic.pause(200)
    } else if (speed == 4) {
        basic.pause(200)
    } else if (speed == 0) {
        basic.pause(1000)
    } else {
        basic.pause(100)
    }
}
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (speed == 5) {
        speed = 0
    } else {
        speed += 1
    }
})
let sprite_2: game.LedSprite = null
let score = 0
let lives = 0
let rounds = 0
let speed = 0
OLED.init(128, 64)
speed = 0
rounds = 0
lives = 3
score = 0
let sprite = game.createSprite(2, 2)
basic.forever(function () {
    if (input.isGesture(Gesture.TiltRight)) {
        sprite.change(LedSpriteProperty.X, 1)
        speed_change()
    }
    if (input.isGesture(Gesture.TiltLeft)) {
        sprite.change(LedSpriteProperty.X, -1)
        speed_change()
    }
    if (input.isGesture(Gesture.LogoUp)) {
        sprite.change(LedSpriteProperty.Y, 1)
        speed_change()
    }
    if (input.isGesture(Gesture.LogoDown)) {
        sprite.change(LedSpriteProperty.Y, -1)
        speed_change()
    }
})
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
        score_update()
        basic.showString("Game over")
    }
})
