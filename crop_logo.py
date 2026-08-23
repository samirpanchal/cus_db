from PIL import Image
import sys

def crop_logo(input_path, output_path):
    img = Image.open(input_path)
    # The image is 1024x1024. The symbol is in the top/middle. The text is at the bottom.
    # Let's crop from 0 to 680 in height to cut off the text.
    cropped = img.crop((100, 100, 924, 630))
    cropped.save(output_path, "PNG")

crop_logo(sys.argv[1], sys.argv[2])
