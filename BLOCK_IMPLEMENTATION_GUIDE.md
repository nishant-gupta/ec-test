# Block Implementation Guide
## Maruti Suzuki Driving School - AEM Edge Delivery

This guide explains how to use the custom blocks created for the Maruti Suzuki Driving School website migration.

---

## Available Blocks

### 1. Stats Block
**Purpose**: Display statistics with icons, numbers, labels, and descriptions.

**Usage**:
```
Stats
---
![Icon](./media/icon1.png)

22,00,000+

HAPPY STUDENTS

We have successfully transformed 22,00,000+ beginners into skilled and confident drivers.
---
![Icon](./media/icon2.png)

2,100+

EXPERT TRAINERS

Get driving training from our team of driving professionals.
---
```

**Features**:
- Responsive grid layout (auto-fit columns)
- Icon/image support
- Large numbers with labels
- Description text
- Mobile-optimized

---

### 2. Accordion Block
**Purpose**: Create collapsible FAQ sections or expandable content.

**Usage**:
```
Accordion
---
What are the eligibility criteria?

You must be 18 years or older with a valid Learner's License.
---
What documents are required?

You need: Valid ID proof, Address proof, Passport-size photographs.
---
```

**Features**:
- Click to expand/collapse
- Only one item open at a time (configurable)
- Smooth animations
- Keyboard accessible (Arrow keys, Escape)
- SVG chevron icons

---

### 3. Carousel Block
**Purpose**: Create rotating content sliders for hero sections or galleries.

**Usage**:
```
Carousel
---
![Hero Image 1](./media/hero1.jpg)

## LEARN DRIVING

Get ready for your driving license exam

[Take Mock Test](https://example.com/test)
---
![Hero Image 2](./media/hero2.jpg)

## EXPERT TRAINERS

Learn from the best

[View Courses](https://example.com/courses)
---
```

**For Hero Carousel**, add class variant: `Carousel (hero-carousel)`

**Features**:
- Auto-play (5-second intervals)
- Previous/Next navigation buttons
- Dot indicators
- Touch/swipe support on mobile
- Pause on hover
- Keyboard navigation (Arrow keys)

---

### 4. Testimonials Block
**Purpose**: Display customer reviews in a rotating carousel format.

**Usage**:
```
Testimonials
---
![Customer Photo](./media/customer1.png)

**Advance Course**

"Thank you for helping me master the skill of driving"

Training experts at Maruti Suzuki Driving School makes learning engaging.

**Laksh Narang, Mumbai**
---
![Customer Photo](./media/customer2.png)

**Learner Course**

"It indeed was a great learning experience"

I've transformed into a confident driver.

**Sonjeet Sabharwal, Kolkata**
---
```

**Features**:
- Carousel-style rotation
- Customer photos with circular frames
- Course type labels
- Quote formatting with decorative quotation marks
- Author attribution
- Navigation arrows and dots
- Touch/swipe support

---

### 5. Courses Block
**Purpose**: Display multiple course offerings in a grid layout.

**Usage**:
```
Courses
---
![Course Image](./media/course1.png)

**Learner Standard Track Course**

If you've never been behind the steering wheel, this course is for you.

- 6 Modules
- 21 Hours

**Starting from Rs. 5,500***

[View Course](https://example.com/course1)
---
![Course Image](./media/course2.png)

**Advance Course**

Build confidence while driving alone.

- 3 Modules
- 8.5 Hours

**Starting from Rs. 4,000***

[View Course](https://example.com/course2)
---
```

**Features**:
- Responsive grid (auto-fit columns)
- Card-based design with hover effects
- Image sections with gradient backgrounds
- Feature lists with checkmarks
- Pricing display
- CTA buttons
- Mobile-optimized (stacks vertically)

---

### 6. Course-Card Block
**Purpose**: Display a single course in a horizontal card layout (featured course).

**Usage**:
```
Course-Card
---
![Course Image](./media/detailed-course.png)

**Learner Detailed Track Course**

At the end of 31 days, you'll know traffic rules and have hands-on experience.

- Number of Modules: 6
- Number of Hours: 31

**Starting from Rs. 9,000***

[View Course](https://example.com/detailed-course)
---
```

**Features**:
- Horizontal layout (image + content side-by-side)
- Label/value pairs for features
- Prominent pricing
- Desktop: side-by-side layout
- Mobile: stacked vertically

---

## Section Styling

### Blue Accent Section
Creates a blue gradient background with white text.

**Usage**:
Add `Style` metadata: `blue-accent`

```
Take the Driving Quiz!

Are you ready to test your driving skills?

[Get Started](https://example.com/quiz)

Style
blue-accent
```

### Grey Section
Creates a light grey background.

**Usage**:
Add `Style` metadata: `grey`

```
Make the Most of Your Driving Course

Value-added services for you.

Style
grey
```

### Dark Blue Section
Creates a dark blue background with white text.

**Usage**:
Add `Style` metadata: `dark-blue`

```
CORPORATE TRAINING

Enhance your organization's road safety.

[Know More](https://example.com/corporate)

Style
dark-blue
```

---

## Best Practices

### 1. **Image Optimization**
- Use WebP format for better compression
- Provide alt text for all images
- Recommended sizes:
  - Hero images: 1920x600px
  - Course images: 800x600px
  - Testimonial photos: 200x200px
  - Stats icons: 160x160px

### 2. **Content Structure**
- Use clear, concise headings
- Keep descriptions under 150 characters
- Use bullet points for features
- Include clear CTAs

### 3. **Accessibility**
- All blocks include ARIA attributes
- Keyboard navigation supported
- Focus management implemented
- Semantic HTML structure

### 4. **Mobile Responsiveness**
- All blocks are mobile-first
- Touch/swipe gestures supported
- Responsive typography
- Stacked layouts on small screens

### 5. **Performance**
- Lazy-load images
- Minimize JavaScript execution
- Use CSS transitions (GPU-accelerated)
- Autoplay pauses on interaction

---

## Color Variables

The following CSS custom properties are available globally:

```css
--primary-blue: #003d82;
--secondary-blue: #0066cc;
--accent-blue: #4a90e2;
--dark-blue: #002855;
--grey-light: #f5f5f5;
--grey-medium: #e0e0e0;
--grey-dark: #666;
```

---

## Troubleshooting

### Block not displaying correctly
1. Verify block name matches exactly (case-sensitive)
2. Check that all required content is present
3. Ensure proper markdown structure with `---` separators

### Carousel not auto-playing
- Autoplay starts after page load
- Pauses on hover/interaction
- Restarts after user action

### Images not loading
1. Check image paths are relative to document
2. Verify images exist in media folder
3. Ensure proper image optimization

### Mobile layout issues
- Test on actual devices, not just browser resize
- Check viewport meta tag is present
- Verify touch events are working

---

## Support

For issues or questions:
1. Check console for JavaScript errors
2. Verify block markup follows examples exactly
3. Test in multiple browsers
4. Review network tab for failed resource loads

---

## Examples Directory Structure

```
/
├── blocks/
│   ├── accordion/
│   ├── carousel/
│   ├── course-card/
│   ├── courses/
│   ├── stats/
│   └── testimonials/
├── media/
│   ├── hero-images/
│   ├── course-images/
│   ├── testimonial-photos/
│   └── icons/
└── index.md (homepage content)
```

---

## Next Steps

1. Review existing content on https://amplify-msds--ec-test--nishant-gupta.aem.page/
2. Add block metadata to appropriate sections
3. Test each block individually
4. Verify responsive behavior
5. Optimize images and assets
6. Test cross-browser compatibility
7. Deploy to production
