from PIL import Image, ImageDraw, ImageFont
import sys

def create_gradient_logo(input_path, output_path, font_path):
    original = Image.open(input_path).convert("RGBA")
    
    # Crop tightly to remove any original text
    symbol = original.crop((0, 0, 1024, 600))
    
    symbol_data = symbol.getdata()
    mask_data = []
    for item in symbol_data:
        avg = (item[0] + item[1] + item[2]) / 3
        alpha = 255 - int(avg)
        mask_data.append(alpha)
    
    mask = Image.new("L", symbol.size)
    mask.putdata(mask_data)
    
    width, height = 1024, 850
    
    # Create text mask
    text_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(text_img)
    try:
        font = ImageFont.truetype(font_path, 86)
    except:
        font = ImageFont.load_default()
        
    text = "ANCHORSTONE"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    
    x = (width - text_width) / 2
    y = 650
    draw.text((x, y), text, font=font, fill=(0, 0, 0, 255))
    text_mask = text_img.split()[3]
    
    # Combine masks
    full_mask = Image.new("L", (width, height), 0)
    full_mask.paste(mask, (0, 50)) # move symbol down a bit
    
    combined_mask_data = []
    fm_data = full_mask.getdata()
    tm_data = text_mask.getdata()
    for i in range(len(fm_data)):
        combined_mask_data.append(max(fm_data[i], tm_data[i]))
        
    combined_mask = Image.new("L", (width, height))
    combined_mask.putdata(combined_mask_data)
    
    # Top to bottom gradient (Green to Blue)
    color1 = (46, 204, 113) # Emerald Green (Top)
    color2 = (41, 128, 185) # Belize Hole Blue (Bottom)
    
    gradient = Image.new("RGBA", (width, height))
    draw_grad = ImageDraw.Draw(gradient)
    
    for i in range(height):
        r = int(color1[0] + (color2[0] - color1[0]) * (i / height))
        g = int(color1[1] + (color2[1] - color1[1]) * (i / height))
        b = int(color1[2] + (color2[2] - color1[2]) * (i / height))
        draw_grad.line([(0, i), (width, i)], fill=(r, g, b, 255))
        
    final_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    final_img.paste(gradient, (0, 0), combined_mask)
    
    final_img.save(output_path, "PNG")

create_gradient_logo(sys.argv[1], sys.argv[2], sys.argv[3])
