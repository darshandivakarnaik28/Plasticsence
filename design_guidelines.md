# Design Guidelines: AI Plastic Classification System

## Design Approach
**Hybrid Approach**: Drawing inspiration from modern AI/ML demonstration interfaces (Google Vision AI, TensorFlow demos, Hugging Face Spaces) combined with Material Design principles for data-dense applications. Focus on clarity, real-time feedback, and educational value.

## Core Design Principles
1. **Clarity First**: Real-time data must be instantly readable
2. **Technical Precision**: Professional, scientific aesthetic that builds trust
3. **Educational Focus**: Make recycling information accessible and engaging
4. **Performance Indication**: Visual feedback shows system is actively processing

---

## Typography

**Primary Font**: Inter (Google Fonts)
- Headings: 600-700 weight
- Body: 400-500 weight
- Data/Numbers: 500-600 weight (tabular numbers enabled)

**Hierarchy**:
- Main Title: 2.5rem (40px), weight 700
- Section Headers: 1.5rem (24px), weight 600
- Plastic Type Display: 2rem (32px), weight 700
- Resin Code: 3rem (48px), weight 700, monospace feel
- Body Text: 1rem (16px), weight 400
- Labels/Metadata: 0.875rem (14px), weight 500

---

## Layout System

**Spacing Units**: Use Tailwind units of **2, 4, 8, 12, 16** for consistent rhythm
- Component padding: p-4 to p-8
- Section margins: mb-8 to mb-16
- Grid gaps: gap-4 to gap-8

**Grid Structure**: 
- Desktop: Two-column layout (camera feed 60% | results panel 40%)
- Tablet: Stacked layout with camera feed on top
- Mobile: Single column, full-width camera feed

**Container**: max-w-7xl, centered with px-4 horizontal padding

---

## Component Library

### Camera Feed Section
- **Video Container**: Rounded corners (rounded-xl), subtle shadow (shadow-2xl)
- **Aspect Ratio**: 16:9 or 4:3 depending on webcam
- **Border**: 2px solid border to distinguish from background
- **Loading State**: Skeleton loader with pulsing animation
- **Overlay Canvas**: Positioned absolutely over video for detection boxes

### Detection Overlay
- **Bounding Box**: 3px stroke width, dashed line style
- **Label Badge**: Floating above bounding box with semi-transparent background (backdrop-blur-md), rounded-full, px-4 py-2

### Results Panel
- **Card Design**: Elevated cards (shadow-lg) with rounded-xl corners
- **Status Indicator**: Large circular badge showing recyclable/non-recyclable with icon
- **Resin Code Display**: Prominent centered number in a circular container
- **Information Grid**: 2-column grid for plastic properties (melting point, common uses, etc.)

### Control Bar
- **Position**: Below camera feed, flex layout
- **Buttons**: Primary (Start Detection), Secondary (Stop), Tertiary (Capture Frame)
- **Status Indicators**: Small colored dots showing camera/AI status

### Recycling Information Cards
- **Layout**: Horizontal cards with left-side color accent (4px border-left)
- **Icon Area**: 64x64px container for recycling symbol
- **Content Sections**: Type, Code, Recyclability, Common Uses, Tips
- **Expandable**: Click to reveal detailed recycling instructions

### Stats Dashboard (Optional)
- **Mini Cards**: 3-4 cards showing detection count, accuracy %, processing time
- **Compact Design**: Icon + number + label in tight layout

---

## Animations

**Use Sparingly**:
- **Detection Pulse**: Subtle pulse on bounding box when new detection occurs (1s duration)
- **Card Entry**: Results card slides in from right (300ms ease-out)
- **Status Change**: Color transition when recyclability updates (200ms)
- **Loading Spinner**: Only for initial camera/model loading

**No animations for**: Hover states, camera feed, continuous detection updates

---

## Accessibility

- **Focus States**: 2px offset ring on all interactive elements
- **Contrast**: WCAG AA compliant text contrast (4.5:1 minimum)
- **Camera Permissions**: Clear error messaging with recovery actions
- **Keyboard Navigation**: Tab order follows reading flow (camera → controls → results)
- **Screen Reader**: Announce detection results with aria-live regions

---

## Images

**No large hero image** - This is a utility application where the camera feed IS the primary visual element.

**Icon Library**: Use **Heroicons** via CDN for UI elements (camera, info, recycling symbols)

**Recycling Symbols**: Use standard recycling symbol SVGs for each resin code (1-7) - source from public domain or icon libraries

---

## Special Considerations

### Real-Time Feedback
- **Processing Indicator**: Small animated bar or spinner near video feed during detection
- **Confidence Score**: Display AI confidence percentage (0-100%) with visual bar
- **FPS Counter**: Optional tech detail in corner showing processing speed

### Educational Elements
- **Info Tooltips**: Hover/click icons next to technical terms
- **Comparison View**: Side-by-side resin code reference chart (collapsible)
- **Environmental Impact**: Brief facts about each plastic type's recycling value

### Error States
- **Camera Access Denied**: Full-screen message with instructions to enable
- **Model Loading Failed**: Retry button with error description
- **No Detection**: Gentle prompt to adjust camera angle or lighting

### Mobile Optimization
- **Touch-Friendly**: Minimum 48x48px tap targets
- **Vertical Layout**: Camera feed stacks above results
- **Simplified Controls**: Combine less-used functions into menu

---

**Final Note**: Prioritize information clarity and real-time responsiveness. Every UI element should serve the core function: helping users understand what plastic they're looking at and whether it's recyclable.