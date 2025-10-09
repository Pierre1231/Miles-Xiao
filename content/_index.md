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
      title: "SMARTER Lighting"
      text: >
        Illuminate the future with precision and innovation.<br>
        **Premium lighting solutions** for modern homes and smart businesses.
    design:
      css_class: "dark"
      text_color_light: true
      background:
        color: "#0b0f1a"
        image:
          filename: "BD1010 1.png"
          filters:
            brightness: 0.35
            contrast: 1.2
          size: contain
          position: center
          parallax: false


  - block: stats
    content:
      items:
        - statistic: "1M+"
          description: |
            lights sold 
            per year
        - statistic: "10k+"
          description: |
            innovative designs 
        - statistic: "3k+"
          description: |
            countries reached
    design:
      # Section background color (CSS class)
      css_class: "bg-gray-100 dark:bg-gray-900"
      # Reduce spacing
      spacing:
        padding: ["1rem", 0, "1rem", 0]
        
  - block: cta-image-paragraph
    id: solutions
    content:
      items:
        - title: short beautiful sentence/name of ur company
          text: long introduction of ur company
          feature_icon: check

          # Upload image to `assets/media/` and reference the filename here
          image: build-website.png


    design:
      # Section background color (CSS class)
      css_class: "bg-gray-100 dark:bg-gray-900"

---
