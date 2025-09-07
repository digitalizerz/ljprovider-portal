# Contributing to LoveJoy Health Provider Portal

Thank you for your interest in contributing to the LoveJoy Health Provider Portal! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Development Setup

1. **Fork and Clone**
```bash
git clone https://github.com/YOUR_USERNAME/provider-portal.git
cd provider-portal
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
# Edit .env.local with your development settings
```

4. **Start Development Server**
```bash
npm run dev
```

## 📋 Development Workflow

### Branch Naming Convention
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates

### Commit Message Format
We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(auth): add two-factor authentication
fix(api): resolve timeout issues
docs(readme): update installation instructions
style(ui): improve button hover states
refactor(hooks): simplify useAuth implementation
```

### Pull Request Process

1. **Create Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make Changes**
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

3. **Test Your Changes**
```bash
npm run lint          # Check code quality
npm run build         # Ensure build works
```

4. **Commit Changes**
```bash
git add .
git commit -m "feat(component): add new feature"
```

5. **Push and Create PR**
```bash
git push origin feature/your-feature-name
```
Then create a Pull Request on GitHub.

## 🏗️ Code Standards

### TypeScript
- Use strict TypeScript configuration
- Define proper interfaces for all data structures
- Avoid `any` types - use proper typing
- Use meaningful variable and function names

### React Components
- Use functional components with hooks
- Follow the single responsibility principle
- Use proper prop typing with interfaces
- Implement error boundaries where appropriate

### Styling
- Use Tailwind CSS classes
- Follow the existing design system
- Maintain responsive design principles
- Use semantic HTML elements

### File Organization
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components
│   ├── views/          # Page-specific components
│   └── profiles/       # Profile-related components
├── hooks/              # Custom React hooks
├── services/           # API service layers
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles
```

## 🔧 API Integration

### Service Layer Pattern
- All API calls go through service classes
- Use proper error handling
- Implement request/response typing
- Follow RESTful conventions

### Authentication
- Use Laravel Sanctum tokens
- Implement proper token refresh
- Handle authentication errors gracefully
- Secure sensitive operations

## 🎨 Design Guidelines

### UI/UX Principles
- Follow Apple-inspired design aesthetics
- Use glassmorphism effects consistently
- Implement smooth animations and transitions
- Ensure accessibility compliance

### Color Palette
- Primary: LoveJoy Blue (#1e3a8a)
- Secondary: Gold (#f59e0b)
- Success: Emerald
- Warning: Amber
- Error: Red

### Typography
- Use system fonts with fallbacks
- Maintain consistent font weights
- Follow proper heading hierarchy
- Ensure readable contrast ratios

## 🧪 Testing

### Manual Testing Checklist
- [ ] All forms validate properly
- [ ] API calls handle errors gracefully
- [ ] Responsive design works on all devices
- [ ] Authentication flow works correctly
- [ ] Navigation functions properly

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for complex functions
- Document API interfaces thoroughly
- Include usage examples for components
- Keep README.md updated

### Component Documentation
```typescript
/**
 * PatientCard component displays patient information in a card format
 * @param patient - Patient data object
 * @param onEdit - Callback function when edit button is clicked
 * @param onView - Callback function when view button is clicked
 */
interface PatientCardProps {
  patient: Patient;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
}
```

## 🚨 Security Guidelines

### Data Handling
- Never log sensitive information
- Validate all user inputs
- Sanitize data before display
- Use HTTPS for all API calls

### Authentication
- Store tokens securely
- Implement proper session management
- Handle token expiration gracefully
- Use secure headers for API requests

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment Information**
   - Browser and version
   - Operating system
   - Node.js version

2. **Steps to Reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior
   - Screenshots if applicable

3. **Additional Context**
   - Console errors
   - Network requests
   - Any relevant logs

## 💡 Feature Requests

For new features, please provide:

1. **Problem Statement**
   - What problem does this solve?
   - Who would benefit from this feature?

2. **Proposed Solution**
   - Detailed description of the feature
   - How it should work
   - Any design considerations

3. **Alternatives Considered**
   - Other approaches you've thought about
   - Why this approach is preferred

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Email**: support@lovejoyhealth.com
- **Documentation**: Check README.md and code comments

## 📄 License

This project is proprietary software owned by LoveJoy Health. By contributing, you agree that your contributions will be licensed under the same terms.

---

Thank you for contributing to LoveJoy Health Provider Portal! 🙏