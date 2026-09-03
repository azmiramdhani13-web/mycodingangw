import math
import time
import turtle


def setup_screen():
    screen = turtle.Screen()
    screen.title("Happy Anniversary! ❤️")
    screen.bgcolor("#FFF0F5")  # Background Lavender Blush (cute)
    screen.setup(width=800, height=700)
    screen.tracer(0)  # Untuk animasi lebih halus
    return screen


def draw_heart(t, x, y, scale=1.0, color="#FF4D6D"):
    t.penup()
    t.goto(x, y)
    t.pendown()
    t.color(color)
    t.fillcolor(color)
    t.begin_fill()

    # Menggambar bentuk hati dengan persamaan kurva
    for i in range(0, 360, 2):
        rad = math.radians(i)
        hx = scale * 16 * (math.sin(rad) ** 3)
        hy = scale * (
            13 * math.cos(rad)
            - 5 * math.cos(2 * rad)
            - 2 * math.cos(3 * rad)
            - math.cos(4 * rad)
        )
        t.goto(x + hx, y + hy)

    t.end_fill()


def draw_flower(t, x, y, size=15):
    t.penup()
    t.goto(x, y)
    t.pendown()

    # Batang
    t.color("#70E000")
    t.pensize(3)
    t.setheading(-90)
    t.forward(40)

    # Kelopak bunga
    t.color("#FFB703")
    t.fillcolor("#FFB703")
    for _ in range(6):
        t.begin_fill()
        t.circle(size, 60)
        t.left(120)
        t.circle(size, 60)
        t.left(60)
        t.end_fill()
        t.left(60)

    # Putik tengah
    t.penup()
    t.goto(x, y - size / 2)
    t.color("#FB8500")
    t.begin_fill()
    t.circle(size / 2)
    t.end_fill()


def write_typing_text(t, text, x, y, font_size=20, color="#C77DFF"):
    t.penup()
    t.goto(x, y)
    t.color(color)

    current_text = ""
    for char in text:
        current_text += char
        t.clear()
        t.write(
            current_text,
            align="center",
            font=("Comic Sans MS", font_size, "bold"),
        )
        turtle.update()
        time.sleep(0.08)


def main():
    screen = setup_screen()
    t = turtle.Turtle()
    t.hideturtle()
    t.speed(0)

    # 1. Menampilkan bunga di samping
    draw_flower(t, -250, -100, size=18)
    draw_flower(t, 250, -100, size=18)
    draw_flower(t, -200, -180, size=15)
    draw_flower(t, 200, -180, size=15)
    screen.update()

    # 2. Efek teks mengetik
    t_text = turtle.Turtle()
    t_text.hideturtle()
    write_typing_text(
        t_text, "Happy Anniversary, Sayang! 💖", 0, 200, 24, "#D81159"
    )

    t_sub = turtle.Turtle()
    t_sub.hideturtle()
    write_typing_text(
        t_sub,
        "Terima kasih sudah selalu ada & mewarnai hariku ✨",
        0,
        -250,
        14,
        "#8338EC",
    )

    # 3. Animasi hati berdenyut (Heartbeat Animation Loop)
    scale = 10.0
    growing = True

    try:
        while True:
            t.clear()
            # Ganti gambar bunga agar tidak hilang saat t.clear()
            draw_flower(t, -250, -100, size=18)
            draw_flower(t, 250, -100, size=18)
            draw_flower(t, -200, -180, size=15)
            draw_flower(t, 200, -180, size=15)

            # Gambar hati utama yang berdenyut
            draw_heart(t, 0, -20, scale=scale, color="#FF4D6D")

            # Hati kecil pelengkap
            draw_heart(t, -120, 80, scale=scale * 0.3, color="#FF85A1")
            draw_heart(t, 120, 80, scale=scale * 0.3, color="#FF85A1")

            # Kontrol denyutan
            if growing:
                scale += 0.2
                if scale >= 12.0:
                    growing = False
            else:
                scale -= 0.2
                if scale <= 10.0:
                    growing = True

            screen.update()
            time.sleep(0.05)
    except turtle.TerminatedError:
        pass


if __name__ == "__main__":
    main()