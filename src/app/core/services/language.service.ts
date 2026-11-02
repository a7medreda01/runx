import { Injectable, signal, computed } from '@angular/core';

export type SupportedLanguage = 'ar' | 'en';
export type TextDirection = 'rtl' | 'ltr';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public currentLang = signal<SupportedLanguage>('ar');
  public dir = computed<TextDirection>(() => (this.currentLang() === 'ar' ? 'rtl' : 'ltr'));

  private translations: Record<SupportedLanguage, Record<string, string>> = {
    ar: {
      nav_home: 'الرئيسية',
      nav_services: 'خدماتنا',
      nav_projects: 'مشاريعنا',
      nav_calculator: 'حاسبة الكلفة',
      nav_contact: 'اتصل بنا',
      nav_consultation: 'طلب استشارة مجانية',
      nav_admin: 'لوحة التحكم',
      lang_btn_label: 'English',
      lang_flag: '🇬🇧',

      hero_badge: '⚡ شركة البرمجيات والحلول السحابية الرائدة',
      hero_title_1: 'نصمم ونبني',
      hero_title_highlight: 'الأنظمة والمنصات الرقمية',
      hero_title_2: 'الأكثر تطوراً لنمو أعمالك',
      hero_subtitle: 'حلول برمجية متكاملة تشمل تطوير المواقع، تطبيقات الجوال، المنصات السحابية، وأنظمة الذكاء الاصطناعي مع ضمان أعلى مستويات الجودة والأمان.',
      hero_cta_calculator: 'احسب كلفة مشروعك فوراً',
      hero_cta_projects: 'تصفح معرض مشاريعنا',
      hero_stat_projects: 'مشروع ناجح',
      hero_stat_clients: 'عميل سعيد',
      hero_stat_experience: 'سنوات خبرة',
      hero_stat_uptime: 'ضمان الاستقرار',

      services_title: 'خدماتنا البرمجية المتكاملة',
      services_subtitle: 'نقدم لك باقة شاملة من الخدمات الرقمية المصممة لرفع كفاءة أعمالك وتمكينك من المنافسة عالمياً.',
      services_view_all: 'عرض كافة الخدمات',
      services_price_starts: 'يبدأ من',
      services_custom_quote: 'حسب نطاق العمل',

      projects_title: 'معرض مشاريعنا وحلولنا المنفذة',
      projects_subtitle: 'استكشف بعضاً من أفضل المنصات والمواقع والتطبيقات التي قمنا بتطويرها لعملائنا في مختلف القطاعات.',
      projects_all_categories: 'الكل',
      projects_view_details: 'عرض تفاصيل المشروع',
      projects_live_demo: 'زيارة الموقع الحي',

      calc_badge: 'أداة التقدير الفوري للتكلفة',
      calc_title: 'حاسبة كلفة مشروعك الرقمي',
      calc_subtitle: 'حدد مواصفات التطبيق، المتجر أو الموقع للحصول على تقدير فوري وشفاف للميزانية والجدول الزمني بالعملة المحلية أو العالمية.',
      calc_currency_egp: 'السعر المصري (ج.م)',
      calc_currency_usd: 'السعر العالمي ($)',
      calc_step1_title: 'اختر نوع المشروع الرقمي',
      calc_step2_title: 'الميزات والإضافات المطلوبة',
      calc_step3_title: 'سرعة التنفيذ والتسليم',
      calc_summary_title: 'ملخص تقدير المشروع',
      calc_selected_type: 'النوع المختار',
      calc_selected_addons: 'الإضافات المختارة',
      calc_estimated_budget: 'الميزانية التقديرية',
      calc_estimated_delivery: 'مدة التسليم التقديرية',
      calc_days_unit: 'يوم عمل',
      calc_no_addons: 'لم يتم تحديد إضافات',
      calc_submit_btn: 'طلب عرض سعر رسمي من الـ API',
      calc_submitting: 'جاري معالجة الطلب في API...',
      
      calc_price_from: 'يبدأ من',
      calc_est_days: 'مدة التنفيذ التقريبية:',
      calc_est_budget: 'الميزانية التقديرية',
      calc_est_timeline: 'مدة التسليم التقديرية',
      calc_input_name: 'الاسم الكريم *',
      calc_input_phone: 'رقم الواتساب / الجوال *',
      calc_submitting_btn: 'جاري معالجة الطلب في الـ API...',
      calc_success_title: 'تم استلام طلب التقدير بنجاح!',
      calc_ref_id: 'رقم الطلب المرجعي:',
      calc_gen_date: 'تاريخ الإنشاء:',
      calc_valid_until: 'صالح حتى:',
      calc_success_desc: 'تم تسجيل تفاصيل طلبك بنجاح وسيتواصل معك مستشارنا الهندسي عبر الواتساب فوراً لتأكيد التفاصيل والبدء في مشروعك.',
      calc_reestimate: 'حساب تقدير جديد',
      calc_name_ph: 'الاسم الكريم *',
      calc_phone_ph: 'رقم الواتساب / الجوال *',
      calc_success_msg: 'تم استلام طلبك بنجاح وسنقوم بالتواصل معك عبر الواتساب فوراً لتأكيد التفاصيل والبدء في تنفيذ مشروعك.',

      contact_badge: 'تواصل مباشر وسريع',
      contact_title: 'دعنا نبدأ في تنفيذ مشروعك الآن',
      contact_subtitle: 'فريقنا المهندسي في انتظارك لتقديم الاستشارة وتحديد الخطة المناسبة لتحويل فكرتك إلى واقع برمجي.',
      contact_info_title: 'معلومات الاتصال المباشر',
      contact_address_label: 'العنوان الرئيس',
      contact_email_label: 'البريد الإلكتروني',
      contact_phone_label: 'الهاتف والواتساب',
      contact_hours_label: 'ساعات العمل الرسمية',
      contact_form_title: 'أرسل لنا رسالتك فوراً',
      contact_form_name: 'الاسم الكامل *',
      contact_form_email: 'البريد الإلكتروني *',
      contact_form_phone: 'رقم الجوال *',
      contact_form_subject: 'موضوع الرسالة *',
      contact_form_message: 'تفاصيل المشروع أو الاستفسار *',
      contact_form_submit: 'إرسال الرسالة إلى الـ API',
      contact_form_submitting: 'جاري الحفظ في الـ API...',
      contact_success_msg: 'تم استلام رسالتك وحفظها بنجاح في قاعدة البيانات وسنتواصل معك خلال 24 ساعة.',

      footer_tagline: 'نبتكر الحلول الرقمية، نسخر التكنولوجيا لتطوير وصناعة المستقبل.',
      footer_quick_links: 'روابط السريعة',
      footer_services: 'خدماتنا المميزة',
      footer_contact_us: 'تواصل معنا',
      footer_rights: 'جميع الحقوق محفوظة © Runx Tech',

      admin_title: 'لوحة التحكم والإدارة الفائقة',
      admin_welcome: 'مرحباً بك في نظام إدارة المحتوى والطلبات الخاص بشركة Runx Tech',
      admin_logout: 'تسجيل الخروج',
      proj_loading: 'جاري تحميل تفاصيل المشروع...',
      proj_back_gallery: 'العودة لمعرض المشاريع',
      proj_execution_year: 'سنة التنفيذ',
      proj_featured_badge: 'مشروع مميز',
      proj_client_label: 'العميل',
      proj_duration_label: 'مدة التنفيذ',
      proj_role_label: 'دور الفريق',
      proj_try_solution_title: 'معاينة وحساب التكلفة',
      proj_try_solution_desc: 'يمكنك زيارة المعاينة الحية للمشروع المباشر أو استخدام الحاسبة لتقدير مشروع مشابه.',
      proj_live_preview: 'المعاينة الحية Live Demo',
      proj_est_similar: 'احسب كلفة مشروع مشابه',
      proj_gallery_title: 'معرض الصور المباشرة من النظام',
      proj_gallery_desc: 'استعرض واجهات النظام والشاشات الرئيسية بالتفصيل',
      proj_gallery_count: 'صور',
      proj_click_fullscreen: 'انقر لتكبير الصورة الشاشة كاملة',
      proj_key_features: 'أبرز المميزات الفنية والوظائف',
      proj_challenges_solutions: 'التحديات البرمجية والحلول المنفذة',
      proj_challenge_label: 'التحدي',
      proj_solution_label: 'الحل الهندسي',
      proj_tech_stack: 'التقنيات وأدوات التطوير',
      proj_cta_title: 'هل تريد تنفيذ مشروع مماثل بأعلى جودة؟',
      proj_cta_desc: 'تواصل مع فريقنا لتطوير فكرتك بناءً على أحدث المعايير الهندسية والحلول السحابية.',
      proj_cta_check1: 'استشارة مجانية 100%',
      proj_cta_check2: 'تقدير مالي فوري',
      proj_cta_btn: 'اطلب استشارتك الآن',
      proj_prev_img: 'السابقة',
      proj_next_img: 'التالية',
      proj_not_found_title: 'المشروع غير موجود',
      proj_not_found_desc: 'لم نتمكن من العثور على المشروع المطلوبة، ربما تم نقلها أو حذفها.'
    },
    en: {
      nav_home: 'Home',
      nav_services: 'Services',
      nav_projects: 'Portfolio',
      nav_calculator: 'Price Estimator',
      nav_contact: 'Contact Us',
      nav_consultation: 'Free Consultation',
      nav_admin: 'Admin Portal',
      lang_btn_label: 'العربية',
      lang_flag: '🇸🇦',

      hero_badge: '⚡ Leading Software & Cloud Solutions Provider',
      hero_title_1: 'We Design & Build',
      hero_title_highlight: 'Advanced Digital Systems',
      hero_title_2: 'To Scale Your Enterprise',
      hero_subtitle: 'End-to-end software solutions spanning web development, mobile apps, SaaS platforms, and AI engineering with top-grade security and reliability.',
      hero_cta_calculator: 'Estimate Project Cost Now',
      hero_cta_projects: 'Explore Our Portfolio',
      hero_stat_projects: 'Successful Projects',
      hero_stat_clients: 'Satisfied Clients',
      hero_stat_experience: 'Years Experience',
      hero_stat_uptime: 'Guaranteed Uptime',

      services_title: 'Our Comprehensive Services',
      services_subtitle: 'Empowering your business growth with robust digital architectures and modern tech stacks.',
      services_view_all: 'View All Services',
      services_price_starts: 'Starts at',
      services_custom_quote: 'Custom Scope',

      projects_title: 'Featured Projects & Case Studies',
      projects_subtitle: 'Explore some of our finest web platforms, mobile applications, and cloud systems delivered across global industries.',
      projects_all_categories: 'All',
      projects_view_details: 'View Project Details',
      projects_live_demo: 'Visit Live Site',

      calc_badge: 'Instant Cost Estimation Tool',
      calc_title: 'Project Cost & Timeline Calculator',
      calc_subtitle: 'Configure your app, e-commerce, or platform specifications for an instant, transparent budget and delivery roadmap in USD or EGP.',
      calc_currency_egp: 'Egyptian Pound (EGP)',
      calc_currency_usd: 'Global USD ($)',
      calc_step1_title: 'Select Digital Project Type',
      calc_step2_title: 'Required Features & Addons',
      calc_step3_title: 'Execution & Delivery Speed',
      calc_summary_title: 'Project Estimate Summary',
      calc_selected_type: 'Selected Type',
      calc_selected_addons: 'Selected Features',
      calc_estimated_budget: 'Estimated Budget',
      calc_estimated_delivery: 'Estimated Timeline',
      calc_days_unit: 'business days',
      calc_no_addons: 'No addons selected',
      calc_submit_btn: 'Request Official API Quote',
      calc_submitting: 'Processing request via API...',
      
      calc_price_from: 'From',
      calc_est_days: 'Estimated duration:',
      calc_est_budget: 'Estimated Budget',
      calc_est_timeline: 'Estimated Timeline',
      calc_input_name: 'Full Name *',
      calc_input_phone: 'WhatsApp / Mobile Number *',
      calc_submitting_btn: 'Processing request via API...',
      calc_success_title: 'Estimate Request Received Successfully!',
      calc_ref_id: 'Reference Code:',
      calc_gen_date: 'Generated At:',
      calc_valid_until: 'Valid Until:',
      calc_success_desc: 'Your estimate request has been logged. Our engineering consultant will contact you via WhatsApp shortly to finalize requirements and kick off your project.',
      calc_reestimate: 'Calculate New Estimate',
      calc_name_ph: 'Full Name *',
      calc_phone_ph: 'WhatsApp / Mobile Number *',
      calc_success_msg: 'Your estimate request has been received. Our team will contact you via WhatsApp shortly to confirm details and initiate your project.',

      contact_badge: 'Direct & Rapid Communication',
      contact_title: "Let's Build Your Project Today",
      contact_subtitle: 'Our engineering consultants are ready to outline the optimal technical roadmap for your vision.',
      contact_info_title: 'Direct Contact Details',
      contact_address_label: 'Headquarters',
      contact_email_label: 'Email Address',
      contact_phone_label: 'Phone & WhatsApp',
      contact_hours_label: 'Working Hours',
      contact_form_title: 'Send Us Your Inquiry',
      contact_form_name: 'Full Name *',
      contact_form_email: 'Email Address *',
      contact_form_phone: 'Phone Number *',
      contact_form_subject: 'Subject *',
      contact_form_message: 'Project Scope or Details *',
      contact_form_submit: 'Submit Message to API',
      contact_form_submitting: 'Saving via API...',
      contact_success_msg: 'Your message has been saved in our database. We will get back to you within 24 hours.',

      footer_tagline: 'Crafting digital solutions and leveraging modern engineering to build the future.',
      footer_quick_links: 'Quick Links',
      footer_services: 'Featured Services',
      footer_contact_us: 'Get In Touch',
      footer_rights: 'All Rights Reserved © Runx Tech',

      admin_title: 'Executive Admin Dashboard',
      admin_welcome: 'Welcome to Runx Tech Management System',
      admin_logout: 'Sign Out',
      proj_loading: 'Loading project details...',
      proj_back_gallery: 'Back to Gallery',
      proj_execution_year: 'Year',
      proj_featured_badge: 'Featured Project',
      proj_client_label: 'Client',
      proj_duration_label: 'Duration',
      proj_role_label: 'Role',
      proj_try_solution_title: 'Preview & Cost Estimator',
      proj_try_solution_desc: 'Explore the live system preview or launch our calculator to estimate a similar project.',
      proj_live_preview: 'Live System Demo',
      proj_est_similar: 'Estimate Similar Project',
      proj_gallery_title: 'System Interface Gallery',
      proj_gallery_desc: 'Detailed screenshots of the application interfaces',
      proj_gallery_count: 'images',
      proj_click_fullscreen: 'Click to view full screen',
      proj_key_features: 'Key Features & Core Architecture',
      proj_challenges_solutions: 'Technical Challenges & Solutions',
      proj_challenge_label: 'Challenge',
      proj_solution_label: 'Engineering Solution',
      proj_tech_stack: 'Technologies & Tools Used',
      proj_cta_title: 'Want to build a high-performance system?',
      proj_cta_desc: 'Get in touch with our engineering team to transform your vision into cloud software.',
      proj_cta_check1: '100% Free Consultation',
      proj_cta_check2: 'Instant Price Estimate',
      proj_cta_btn: 'Request Consultation Now',
      proj_prev_img: 'Previous',
      proj_next_img: 'Next',
      proj_not_found_title: 'Project Not Found',
      proj_not_found_desc: 'The requested project could not be found.'
    }
  };

  public t = computed(() => this.translations[this.currentLang()]);

  constructor() {
    this.initLanguage();
  }

  private initLanguage(): void {
    const savedLang = localStorage.getItem('runx_lang') as SupportedLanguage | null;
    if (savedLang === 'ar' || savedLang === 'en') {
      this.applyLanguage(savedLang);
    } else {
      this.applyLanguage('ar');
    }
  }

  public setLanguage(lang: SupportedLanguage): void {
    this.applyLanguage(lang);
    localStorage.setItem('runx_lang', lang);
  }

  public toggleLanguage(): void {
    const nextLang = this.currentLang() === 'ar' ? 'en' : 'ar';
    this.setLanguage(nextLang);
  }

  private applyLanguage(lang: SupportedLanguage): void {
    this.currentLang.set(lang);
    const textDir: TextDirection = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = textDir;
    document.documentElement.lang = lang;
  }
}
