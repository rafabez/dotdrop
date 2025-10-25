#!/usr/bin/env python3
"""
Icon generator for DotDrop extension
Generates PNG icons in various sizes
"""

try:
    from PIL import Image, ImageDraw
    import os
except ImportError:
    print("PIL/Pillow not found. Install with: pip install Pillow")
    exit(1)

def create_icon(size, is_warning=False):
    """Create an icon of the specified size"""
    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Colors
    if is_warning:
        bg_color = (239, 68, 68, 255)  # Red
    else:
        bg_color = (102, 126, 234, 255)  # Purple
    
    # Draw circle background
    margin = 2
    draw.ellipse([margin, margin, size-margin, size-margin], fill=bg_color)
    
    # Draw lock icon
    lock_color = (255, 255, 255, 255)  # White
    
    # Lock body
    lock_width = int(size * 0.4)
    lock_height = int(size * 0.35)
    lock_x = (size - lock_width) // 2
    lock_y = int(size * 0.45)
    
    draw.rectangle([lock_x, lock_y, lock_x + lock_width, lock_y + lock_height], 
                   fill=lock_color)
    
    # Lock shackle (arc)
    shackle_radius = lock_width // 3
    shackle_y = lock_y - int(size * 0.05)
    shackle_thickness = int(size * 0.08)
    
    # Draw arc using chord
    draw.arc([size//2 - shackle_radius - shackle_thickness//2, 
              shackle_y - shackle_radius,
              size//2 + shackle_radius + shackle_thickness//2, 
              shackle_y + shackle_radius],
             180, 0, fill=lock_color, width=shackle_thickness)
    
    # Keyhole
    keyhole_color = bg_color if not is_warning else (239, 68, 68, 255)
    keyhole_radius = int(size * 0.06)
    keyhole_y = lock_y + int(lock_height * 0.35)
    
    draw.ellipse([size//2 - keyhole_radius, keyhole_y - keyhole_radius,
                  size//2 + keyhole_radius, keyhole_y + keyhole_radius],
                 fill=keyhole_color)
    
    # Keyhole stem
    stem_width = int(size * 0.06)
    stem_height = int(lock_height * 0.35)
    draw.rectangle([size//2 - stem_width//2, keyhole_y,
                    size//2 + stem_width//2, keyhole_y + stem_height],
                   fill=keyhole_color)
    
    return img

def main():
    """Generate all icon sizes"""
    # Create icons directory
    icons_dir = 'icons'
    os.makedirs(icons_dir, exist_ok=True)
    
    sizes = [16, 32, 48, 128]
    
    # Generate normal icons
    for size in sizes:
        img = create_icon(size, is_warning=False)
        img.save(f'{icons_dir}/icon{size}.png')
        print(f'Generated icon{size}.png')
    
    # Generate warning icons
    for size in sizes:
        img = create_icon(size, is_warning=True)
        img.save(f'{icons_dir}/icon-warning{size}.png')
        print(f'Generated icon-warning{size}.png')
    
    print('\nAll icons generated successfully!')

if __name__ == '__main__':
    main()
