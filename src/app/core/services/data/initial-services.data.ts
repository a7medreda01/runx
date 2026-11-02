import { ServiceItem } from '../../models/project.model';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'تطوير تطبيقات الويب والمنصات السحابية SaaS',
    subtitle: 'أنظمة سحابية متكاملة عالية الاعتمادية والأمان',
    icon: 'code-slash',
    bootstrapIcon: 'bi-code-slash',
    imageUrl: '/assets/images/saas_dashboard_preview_1786458589392.jpg',
    description: 'تصميم وبناء مواقع وتطبيقات ويب سريعة، آمنة ومتحكمة في الضغط العالي مع لوحات تحكم تفاعلية مخصصة.',
    features: [
      'لوحات تحكم تفاعلية مع تقارير فورية ودقيقة',
      'تكامل آمن مع بوابات الدفع الإلكتروني والخدمات السحابية',
      'أداء سريع بمعمارية متطورة تضمن استقرار 99.9%'
    ],
    technologies: ['Angular', 'TypeScript', 'ASP.NET Core', 'Node.js', 'PostgreSQL', 'Docker'],
    priceStart: 'يبدأ من 1,500 $',
    priceUsd: 1500,
    priceEgp: 75000
  },
  {
    id: 'srv-2',
    title: 'تصميم وتطوير تطبيقات الهواتف الذكية iOS & Android',
    subtitle: 'تطبيقات أصلية وعابرة للمنصات بأداء ممتاز',
    icon: 'phone',
    bootstrapIcon: 'bi-phone',
    imageUrl: '/assets/images/mobile_app_preview_1786458603836.jpg',
    description: 'تطوير تطبيقات جوال ذكية توفر تجربة مستخدم سلسة واستجابة فورية مع ربط كامل مع السيرفرات والخرائط.',
    features: [
      'تطبيقات عابرة للمنصات باستخدام Flutter بنفس الكفاءة والأمان',
      'تتبع مباشر على الخرائط وأنظمة الإشعارات الفورية',
      'دعم الدفع الإلكتروني الداخلي وبصمة الوجه والإصبع'
    ],
    technologies: ['Flutter', 'Dart', 'Swift', 'Kotlin', 'Firebase', 'REST APIs'],
    priceStart: 'يبدأ من 2,000 $',
    priceUsd: 2000,
    priceEgp: 100000
  },
  {
    id: 'srv-3',
    title: 'تصميم وتطوير المتاجر الإلكترونية المتكاملة',
    subtitle: 'حلول تجارة إلكترونية ترفع معدل التحويل والمبيعات',
    icon: 'bag-check',
    bootstrapIcon: 'bi-bag-check',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    description: 'بناء متاجر إلكترونية احترافية مخصصة لتحقيق أعلى معدل مبيعات، مع ربط كامل لشركات الشحن والدفع.',
    features: [
      'تجربة شراء سريعة بخطوة واحدة لتقليل سلات الشراء المتروكة',
      'ربط مع بوابات الدفع (مدى، أبل باي، تمارا، تابي، فيزا)',
      'إدارة مخزون متقدمة وتحديث فوري لحالات الطلبات'
    ],
    technologies: ['Angular', 'RxJS', 'Node.js', 'Stripe', 'Redis', 'WebSockets'],
    priceStart: 'يبدأ من 1,800 $',
    priceUsd: 1800,
    priceEgp: 90000
  },
  {
    id: 'srv-4',
    title: 'تصميم واجهات وتجربة المستخدم UI/UX',
    subtitle: 'واجهات إبداعية تضمن أفضل تجربة استخدام لعملائك',
    icon: 'palette',
    bootstrapIcon: 'bi-palette',
    imageUrl: '/assets/images/hero_tech_showcase_1786458572855.jpg',
    description: 'دراسة وتصميم واجهات وتجربة مستخدم مخصصة لهوية منطقتك وجمهورك المستهدف مع تصميم النماذج التفاعلية.',
    features: [
      'تحليل وتخطيط رحلة المستخدم لتسهيل الاستخدام والتنقل',
      'تصميم نماذج تفاعلية حية (Prototypes) قبل البدء بالبرمجة',
      'بناء نظام تصميم متكامل (Design System) للهوية الرقمية'
    ],
    technologies: ['Figma', 'Adobe XD', 'Prototyping', 'Design Systems', 'User Research'],
    priceStart: 'يبدأ من 900 $',
    priceUsd: 900,
    priceEgp: 45000
  },
  {
    id: 'srv-5',
    title: 'استشارات الهندسة البرمجية والأمان السحابي',
    subtitle: 'حماية وتطوير معمارية الأنظمة القائمة ورَفْع الكفاءة',
    icon: 'shield-check',
    bootstrapIcon: 'bi-shield-check',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    description: 'تقييم الأنظمة البرمجية القائمة، رفع مستوى الأمان، وتحسين السرعة وإعادة هيكلة الكود البرمجي.',
    features: [
      'فحص ثغرات الأمان واختبار الاختراق التكتيكي للأنظمة',
      'تحسين سرعة الاستجابة وزمن التحميل للسيرفرات',
      'إعادة هيكلة الكود وقواعد البيانات لتتحمل آلاف المستعملين'
    ],
    technologies: ['Cloudflare', 'Linux', 'Nginx', 'SSL', 'CyberSecurity'],
    priceStart: 'يبدأ من 800 $',
    priceUsd: 800,
    priceEgp: 40000
  }
];
