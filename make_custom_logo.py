from PIL import Image, ImageDraw, ImageFont
import sys

def create_logo(input_path, output_path, font_path):
    # Open original image
    original = Image.open(input_path).convert("RGBA")
    
    # The image is likely 1024x1024. The symbol is in the top 2/3rds.
    # Let's crop the symbol out. Let's guess the bounding box for the symbol is (0, 0, 1024, 750)
    symbol = original.crop((0, 0, 1024, 750))
    
    # Create a new image
    new_img = Image.new("RGBA", (1024, 900), (255, 255, 255, 255))
    
    # Paste symbol
    new_img.paste(symbol, (0, 0))
    
    # Draw text
    draw = ImageDraw.Draw(new_img)
    try:
        font = ImageFont.truetype(font_path, 48)
    except:
        font = ImageFont.load_default()
        
    text = "ANCHORSTONE GLOBAL LLP"
    
    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (1024 - text_width) / 2
    y = 750
    
    draw.text((x, y), text, font=font, fill=(25, 30, 36, 255)) # Dark gray/black
    
    # Make transparent
    datas = new_img.getdata()
    newData = []
    for item in datas:
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
    new_img.putdata(newData)
    
    new_img.save(output_path, "PNG")

create_logo(sys.argv[1], sys.argv[2], sys.argv[3])
