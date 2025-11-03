---
title: 
date: 2023-10-24
type: landing

design:
  # Default section spacing
  spacing: "6rem"

sections:
  - block: hero
    content:
      title: "Light up your home<br>Ignite your dream"
      text: ""
    design:
      css_class: "dark"
      text_color_light: true
      css_style: |
        display: flex !important;
        align-items: flex-start !important;   /* 顶部对齐 */
        justify-content: center !important;   /* 水平居中 */
        padding: 1.25rem 2rem !important;     /* 顶部留白 */
        text-align: center !important;        /* 文本居中 */
      background:
        color: "#0b0f1a"
        image:
          filename: "hero_pic2.jpg"
          filters:
            brightness: 0.55
            contrast: 1.05
          size: contain
          repeat: no-repeat
          position: center
          parallax: false
        
  - block: cta-image-paragraph
    id: solutions
    content:
      items:
        - title: SMARTER LIGHTING HK LTD
          text: >
            Smarter Lighting is an emerging brand in the lighting industry, distinguished by its innovative design philosophy and exceptional craftsmanship. Drawing inspiration from nature and optical aesthetics, it integrates modern artistry with functionality to create refined lighting solutions for both residential and commercial spaces.
            
            For Smarter Lighting, light is not just illumination—it is a medium of art that defines mood and depth. Through the balance of brightness and shadow, its designs merge science and aesthetics to shape tranquil and inspiring environments. Each piece is created to harmonize with its space, offering a seamless blend of comfort, elegance, and sensory pleasure—transforming light into a refined expression of life.

          feature_icon: check

          # Upload image to `assets/media/` and reference the filename here
          image: good_pic.png


    design:
      # Section background color (CSS class)
      css_class: "bg-gray-100 dark:bg-gray-900"
      spacing:
        padding: ["0rem", 0, "0rem", 0]

---
