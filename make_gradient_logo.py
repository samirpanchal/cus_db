from PIL import Image, ImageDraw, ImageFont
import sys

def create_gradient_logo(input_path, output_path):
    original = Image.open(input_path).convert("RGBA")
    
    # Crop the symbol, just the top part where the symbol lives
    symbol = original.crop((0, 0, 1024, 640))
    
    symbol_data = symbol.getdata()
    mask_data = []
    
    # Find bounding box of the non-transparent pixels to crop it tightly
    min_x, min_y = 1024, 640
    max_x, max_y = 0, 0
    
    for y in range(640):
        for x in range(1024):
            idx = y * 1024 + x
            item = symbol_data[idx]
            avg = (item[0] + item[1] + item[2]) / 3
            alpha = 255 - int(avg)
            mask_data.append(alpha)
            
            if alpha > 50:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    # Add a bit of padding
    padding = 20
    min_x = max(0, min_x - padding)
    min_y = max(0, min_y - padding)
    max_x = min(1024, max_x + padding)
    max_y = min(640, max_y + padding)
    
    mask = Image.new("L", symbol.size)
    mask.putdata(mask_data)
    
    # Crop mask tightly
    cropped_mask = mask.crop((min_x, min_y, max_x, max_y))
    width, height = cropped_mask.size
    
    color1 = (46, 204, 113) # Emerald Green (Top)
    color2 = (41, 128, 185) # Belize Hole Blue (Bottom)
    
    gradient = Image.new("RGBA", (width, height))
    draw_grad = ImageDraw.Draw(gradient)
    
    for j in range(height):
        r = int(color1[0] + (color2[0] - color1[0]) * (j / height))
        g = int(color1[1] + (color2[1] - color1[1]) * (j / height))
        b = int(color1[2] + (color2[2] - color1[2]) * (j / height))
        draw_grad.line([(0, j), (width, j)], fill=(r, g, b, 255))
        
    final_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    final_img.paste(gradient, (0, 0), cropped_mask)
    
    final_img.save(output_path, "PNG")

create_gradient_logo(sys.argv[1], sys.argv[2])
