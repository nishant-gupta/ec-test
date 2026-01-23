# Maruti Suzuki Driving School - Migration Plan

## Current Website Analysis
**URL**: https://www.marutisuzukidrivingschool.com

### Key Components Identified

1. **Hero Carousel** - Multi-slide carousel with CTA buttons
2. **Promotional Banner** - L2B Scheme information
3. **Stats Section** - 22,00,000+ students, 2,100+ trainers, 540+ schools
4. **Why Choose Section** - 3 stat cards + feature card with CTA
5. **Quiz Section** - Driving quiz promotion with stats
6. **Courses Carousel** - 4 driving courses with details
7. **Value-Added Services Carousel** - 3 service cards
8. **School Locator** - City-based search
9. **Corporate Course Section** - Dedicated CTA section
10. **Blog Cards** - Latest articles carousel
11. **Testimonials Carousel** - Student reviews
12. **Coach Profiles Carousel** - Expert trainers
13. **Media/News Carousel** - Company updates
14. **Referral Section** - Friend referral form
15. **FAQ Section** - Collapsible Q&A

### Blocks to Create

#### New Blocks Required:
- [ ] `carousel` - For hero, courses, testimonials, coaches, media
- [ ] `stats` - For statistics display (students, trainers, schools)
- [ ] `promo-banner` - For promotional content with disclaimer
- [ ] `feature-cards` - For why-choose section
- [ ] `quiz-promo` - For quiz promotion section
- [ ] `course-card` - For driving courses
- [ ] `testimonials` - For student reviews
- [ ] `coach-profiles` - For trainer profiles
- [ ] `school-locator` - For finding schools by city
- [ ] `referral-form` - For friend referrals
- [ ] `accordion` - For FAQ section

#### Existing Blocks to Use:
- [x] `hero` - For simple hero sections
- [x] `cards` - Can be adapted for blog posts
- [x] `columns` - For layout structures

### Migration Strategy

**Phase 1: Core Structure**
1. Create homepage document structure
2. Implement hero carousel block
3. Add stats section
4. Set up basic styling

**Phase 2: Main Content**
1. Create courses carousel block
2. Implement feature cards
3. Add testimonials carousel
4. Create blog cards section

**Phase 3: Interactive Features**
1. School locator functionality
2. Quiz promotion section
3. Referral form
4. FAQ accordion

**Phase 4: Additional Content**
1. Coach profiles carousel
2. Media/news carousel
3. Value-added services
4. Corporate course CTA

### Technology Stack
- **Images**: Need to be optimized and converted to WebP
- **Icons**: SVG format
- **Carousels**: JavaScript-based using Swiper or custom implementation
- **Forms**: Integration with backend API
- **Analytics**: RUM (Real User Monitoring) already in place

### Content Requirements
- High-quality images for hero, courses, coaches
- Copy for all sections
- Course details and pricing
- Testimonial content
- Blog posts
- FAQ content

### SEO Considerations
- Proper heading hierarchy
- Meta descriptions
- Structured data for courses
- Image alt text
- Mobile responsiveness

### Timeline Estimate
- Phase 1: 1-2 days
- Phase 2: 2-3 days
- Phase 3: 2-3 days
- Phase 4: 1-2 days
- Testing & QA: 1-2 days

**Total**: ~7-12 days for complete migration
