import textwrap

from PIL import Image, ImageDraw, ImageFont

DESC_LIMIT = 36


def generate_card(name, description, color, inside_image, mana, power):
    img = Image.open('cards/template2.png').convert("RGB")
    ImageDraw.floodfill(img, (100, 50), value=color)
    # ImageDraw.floodfill(img, (50, 200), value=color)
    ImageDraw.floodfill(img, (120, 480), value=color)
    ImageDraw.floodfill(img, (280, 600), value=color)
    # ImageDraw.floodfill(img, (490, 740), value=color)

    draw = ImageDraw.Draw(img)
    font_small = ImageFont.truetype("cards/CallingCode-Regular.ttf", 24)
    descwrapped = '\n'.join(textwrap.wrap(description, width=DESC_LIMIT))
    draw.text((25, 512), descwrapped, (0, 0, 0), font=font_small)

    font_big = ImageFont.truetype("cards/CallingCode-Regular.ttf", 40)
    draw.text((25, 32), name, (0, 0, 0), font=font_big)
    draw.text((510, 10), str(mana), (0, 0, 0), font=font_big)
    draw.text((480, 727), str(power), (0, 0, 0), font=font_big)

    inner_img = Image.open(inside_image, 'r')
    inner_img = inner_img.resize((563, 352), Image.ANTIALIAS)
    img.paste(inner_img, (18, 106))

    img.save('static/result.png', "PNG")


if __name__ == '__main__':
    desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    name = "La Ura Giga"
    inner_path = "cards/creature1.png"
    generate_card(name, desc, (240, 200, 60, 0), inner_path, 12, 1500)
