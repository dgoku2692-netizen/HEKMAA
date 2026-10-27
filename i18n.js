(() => {
  const languages = ['ar', 'en', 'fr', 'de', 'es', 'zh', 'tr', 'it', 'ru', 'ja', 'pt', 'id', 'ur'];
  const rtlLanguages = ['ar', 'ur'];
  const languageNames = {
    ar: 'العربية',
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    es: 'Español',
    zh: '中文',
    tr: 'Türkçe',
    it: 'Italiano',
    ru: 'Русский',
    ja: '日本語',
    pt: 'Português',
    id: 'Bahasa Indonesia',
    ur: 'اردو'
  };

  const dictionaries = {
    en: {
      'نقرأها سوا': 'Read Together', 'إعدادات الصوت': 'Voice Settings', 'قصة جديدة': 'New Story',
      'كل قصة، عالم جديد.': 'Every story, a whole new world.',
      'اختار حكايتك وخلي حكمة تقرأها معاك، أو أضف نصك الخاص.': 'Pick a story for Hikma to read aloud, or bring your own.',
      'مكتبتك': 'Your Library', 'ابحث في القصص': 'Search stories', 'ابحث عن قصة...': 'Search for a story...',
      'فلترة القصص': 'Filter stories', 'كل القصص': 'All Stories', 'قصصي': 'My Stories', 'المكتبة': 'Library',
      'إضافة': 'Add', 'إضافة قصة': 'Add Story', 'الصوت': 'Voice', 'الإعدادات': 'Settings',
      'إضافة قصة للمكتبة': 'Add Story to Library', 'عنوان القصة': 'Story Title', 'النص': 'Story Text',
      'الترجمة (اختياري)': 'Translation (Optional)', 'حفظ القصة': 'Save Story', 'إلغاء': 'Cancel',
      'إعدادات حكمة': 'Hikma Settings', 'العمر والواجهة': 'Age & Interface', 'أقل من 16 سنة': 'Under 16',
      '16 سنة أو أكثر': '16 or Older', 'المساعدة وإمكانية الوصول': 'Accessibility & Assistance',
      'خيارات إمكانية الوصول': 'Accessibility Options', 'شخصية القلم': 'Pen Character', 'المظهر': 'Appearance',
      'لغة التطبيق': 'App Language', 'لغة القراءة': 'Reading Language', 'الأصل': 'Original',
      'العربية': 'Arabic', 'حكاية عربية': 'Arabic Tale', 'English story': 'English Story',
      'سرعة القراءة': 'Reading Speed', 'طبقة الصوت': 'Voice Pitch', 'هادئة': 'Gentle', 'أسرع': 'Faster',
      'أخفض': 'Deeper', 'أعلى': 'Higher', 'الجملة السابقة': 'Previous Sentence', 'الجملة التالية': 'Next Sentence',
      'تشغيل القراءة': 'Play Story', 'إيقاف مؤقت': 'Pause', 'متابعة القراءة من بداية الجملة': 'Resume from sentence start',
      'إعادة القراءة': 'Replay Story', 'تشغيل بصوت الجهاز': 'Play with Device Voice',
      'تشكيل النص العربي': 'Add Arabic Diacritics', 'إيقاف التشكيل': 'Disable Diacritics',
      'تحرير الترجمة يدويًا': 'Edit Translation Manually', 'النص المترجم': 'Translated Text',
      'حفظ الترجمة': 'Save Translation', 'حفظ موضعي الحالي': 'Save Bookmark',
      'الانتقال للعلامة المحفوظة': 'Jump to Bookmark', 'ملاحظتي': 'My Note', 'حفظ الملاحظة': 'Save Note',
      'إغلاق': 'Close', 'تفعيل الوضع التجريبي': 'Continue in Local Demo', 'التحقق من الرمز': 'Verify Code',
      'رمز التفعيل': 'Activation Code', 'تباعد الأسطر': 'Line Spacing', 'حجم النص': 'Text Size',
      'داكن': 'Dark', 'فاتح': 'Light', 'إضافة صوت بشري': 'Add Human Voice', 'إدارة الصوت البشري': 'Manage Voice Recording',
      'حفظ الصوت': 'Save Audio', 'حذف': 'Delete', 'التقدم': 'Progress', 'قصتي': 'My Story',
      'اختيار لغة التطبيق': 'Select App Language', 'أهلاً بيك في حكمة': 'Welcome to Hikma',
      'هل عمرك 16 سنة أو أكثر؟': 'Are you 16 or older?', 'تحب نفعّل وضع المساعدة؟': 'Enable accessibility mode?',
      'القراءة': 'Reading', 'الصوت والقراءة': 'Voice & Reading', 'مثال: مغامرة في الغابة': 'e.g. Forest Adventure',
      'اكتب أو الصق قصتك هنا...': 'Write or paste your story here...',
      'أضف ترجمة القصة للغة الأخرى': 'Add translation in another language',
      'لا توجد قصص هنا بعد': 'No stories here yet',
      'جرّب كلمة بحث أخرى أو أضف قصة جديدة.': 'Try another search term or create a new story.',
      'صوت بشري للقصة': 'Human Voice Recording', 'استمع للتسجيل': 'Listen to Recording',
      'اختيار ملف صوتي': 'Select Audio File', 'تسجيل من الميكروفون': 'Record from Microphone',
      'ابدأ التسجيل': 'Start Recording', 'إيقاف التسجيل': 'Stop Recording',
      'قلم حكمة الذكي': 'Hikma Smart Pen', 'ميدالية وجدتها': 'Wajadtaha Finder Tag',
      'متصل بالبلوتوث': 'Bluetooth Connected', 'غير متصل': 'Disconnected',
      'وضع القلم التفاعلي': 'Interactive Pen Touch Mode',
      'امسح كود الكتاب': 'Scan Book QR', 'ماسح الكتب وكود QR': 'Smart Book & QR Scanner',
      'استكشاف اللور وقصص الويب': 'Web & Game Lore Explorer', 'لور وقصص الألعاب': 'Lore & Web Stories',
      'أضف ملاحظة': 'Add Note', 'ملاحظات الكتاب': 'Book Notes', 'حقيبة المذاكرة الذكية': 'Smart Study Bundle',
      'آخر موقع معروف': 'Last Known GPS Location', 'زر الطوارئ SOS': 'Emergency SOS Button',
      'التعرف التلقائي على اللغة (IP)': 'Auto-Detect Language by Location (IP)'
    },
    fr: {
      'نقرأها سوا': 'Lisons Ensemble', 'إعدادات الصوت': 'Réglages Vocaux', 'قصة جديدة': 'Nouvelle Histoire',
      'كل قصة، عالم جديد.': 'Chaque histoire est un nouveau monde.',
      'اختار حكايتك وخلي حكمة تقرأها معاك، أو أضف نصك الخاص.': 'Choisissez un récit pour Hikma ou ajoutez le vôtre.',
      'مكتبتك': 'Votre Bibliothèque', 'ابحث في القصص': 'Rechercher des récits', 'ابحث عن قصة...': 'Rechercher une histoire...',
      'فلترة القصص': 'Filtrer les récits', 'كل القصص': 'Tous les récits', 'قصصي': 'Mes Histoires', 'المكتبة': 'Bibliothèque',
      'إضافة': 'Ajouter', 'إضافة قصة': 'Ajouter une histoire', 'الصوت': 'Voix', 'الإعدادات': 'Paramètres',
      'إضافة قصة للمكتبة': 'Ajouter à la bibliothèque', 'عنوان القصة': 'Titre du récit', 'النص': 'Texte de l’histoire',
      'الترجمة (اختياري)': 'Traduction (Facultative)', 'حفظ القصة': 'Enregistrer', 'إلغاء': 'Annuler',
      'إعدادات حكمة': 'Paramètres Hikma', 'العمر والواجهة': 'Âge et Interface', 'أقل من 16 سنة': 'Moins de 16 ans',
      '16 سنة أو أكثر': '16 ans ou plus', 'المساعدة وإمكانية الوصول': 'Accessibilité et Aide',
      'خيارات إمكانية الوصول': 'Options d’accessibilité', 'شخصية القلم': 'Personnage du stylo', 'المظهر': 'Apparence',
      'لغة التطبيق': 'Langue de l’application', 'لغة القراءة': 'Langue de lecture', 'الأصل': 'Original',
      'العربية': 'Arabe', 'حكاية عربية': 'Conte arabe', 'English story': 'Histoire anglaise',
      'سرعة القراءة': 'Vitesse de lecture', 'طبقة الصوت': 'Tonalité', 'هادئة': 'Lente', 'أسرع': 'Plus rapide',
      'أخفض': 'Plus grave', 'أعلى': 'Plus aiguë', 'الجملة السابقة': 'Phrase précédente', 'الجملة التالية': 'Phrase suivante',
      'تشغيل القراءة': 'Lancer la lecture', 'إيقاف مؤقت': 'Pause', 'متابعة القراءة من بداية الجملة': 'Reprendre la phrase',
      'إعادة القراءة': 'Recommencer', 'تشغيل بصوت الجهاز': 'Voix de l’appareil',
      'تشكيل النص العربي': 'Ajouter les voyelles', 'إيقاف التشكيل': 'Sans voyelles',
      'تحرير الترجمة يدويًا': 'Modifier la traduction', 'النص المترجم': 'Texte traduit',
      'حفظ الترجمة': 'Enregistrer la traduction', 'حفظ موضعي الحالي': 'Poser un marque-page',
      'الانتقال للعلامة المحفوظة': 'Aller au marque-page', 'ملاحظتي': 'Ma note', 'حفظ الملاحظة': 'Enregistrer la note',
      'إغلاق': 'Fermer', 'تفعيل الوضع التجريبي': 'Continuer en mode démo', 'التحقق من الرمز': 'Vérifier le code',
      'رمز التفعيل': 'Code d’activation', 'تباعد الأسطر': 'Interligne', 'حجم النص': 'Taille du texte',
      'داكن': 'Sombre', 'فاتح': 'Clair', 'إضافة صوت بشري': 'Ajouter une voix humaine', 'إدارة الصوت البشري': 'Gérer l’enregistrement',
      'حفظ الصوت': 'Sauvegarder l’audio', 'حذف': 'Supprimer', 'التقدم': 'Progression', 'قصتي': 'Mon histoire',
      'اختيار لغة التطبيق': 'Choisir la langue', 'أهلاً بيك في حكمة': 'Bienvenue sur Hikma',
      'هل عمرك 16 سنة أو أكثر؟': 'Avez-vous 16 ans ou plus ?', 'تحب نفعّل وضع المساعدة؟': 'Activer les aides d’accessibilité ?',
      'القراءة': 'Lecture', 'الصوت والقراءة': 'Voix et lecture', 'مثال: مغامرة في الغابة': 'Exemple : Une aventure en forêt',
      'اكتب أو الصق قصتك هنا...': 'Écrivez ou collez votre histoire ici...',
      'أضف ترجمة القصة للغة الأخرى': 'Ajoutez une traduction dans une autre langue',
      'لا توجد قصص هنا بعد': 'Aucune histoire pour l’instant',
      'جرّب كلمة بحث أخرى أو أضف قصة جديدة.': 'Essayez un autre mot-clé ou ajoutez une histoire.',
      'صوت بشري للقصة': 'Enregistrement vocal humain', 'استمع للتسجيل': 'Écouter l’enregistrement',
      'اختيار ملف صوتي': 'Choisir un fichier audio', 'تسجيل من الميكروفون': 'Enregistrer au micro',
      'ابدأ التسجيل': 'Démarrer l’enregistrement', 'إيقاف التسجيل': 'Arrêter l’enregistrement',
      'قلم حكمة الذكي': 'Stylo Intelligent Hikma', 'ميدالية وجدتها': 'Balise Anti-perte Wajadtaha',
      'متصل بالبلوتوث': 'Connecté en Bluetooth', 'غير متصل': 'Déconnecté',
      'وضع القلم التفاعلي': 'Mode stylo interactif',
      'امسح كود الكتاب': 'Scanner le code du livre', 'ماسح الكتب وكود QR': 'Scanner de livres & QR',
      'استكشاف اللور وقصص الويب': 'Explorateur de Lore et du Web', 'لور وقصص الألعاب': 'Récits & Lore de jeux',
      'أضف ملاحظة': 'Ajouter une note', 'ملاحظات الكتاب': 'Notes du livre', 'حقيبة المذاكرة الذكية': 'Pack d’Étude Intelligent',
      'آخر موقع معروف': 'Dernière position GPS connue', 'زر الطوارئ SOS': 'Bouton SOS d’Urgence',
      'التعرف التلقائي على اللغة (IP)': 'Détection automatique de la langue (IP)'
    },
    de: {
      'نقرأها سوا': 'Gemeinsam Lesen', 'إعدادات الصوت': 'Stimmeinstellungen', 'قصة جديدة': 'Neue Geschichte',
      'كل قصة، عالم جديد.': 'Jede Geschichte ist eine neue Welt.',
      'اختار حكايتك وخلي حكمة تقرأها معاك، أو أضف نصك الخاص.': 'Wähle eine Geschichte für Hikma oder füge deinen eigenen Text ein.',
      'مكتبتك': 'Deine Bibliothek', 'ابحث في القصص': 'Geschichten durchsuchen', 'ابحث عن قصة...': 'Nach einer Geschichte suchen...',
      'فلترة القصص': 'Filtern', 'كل القصص': 'Alle Geschichten', 'قصصي': 'Meine Geschichten', 'المكتبة': 'Bibliothek',
      'إضافة': 'Hinzufügen', 'إضافة قصة': 'Geschichte hinzufügen', 'الصوت': 'Stimme', 'الإعدادات': 'Einstellungen',
      'إضافة قصة للمكتبة': 'Zur Bibliothek hinzufügen', 'عنوان القصة': 'Titel', 'النص': 'Text',
      'الترجمة (اختياري)': 'Übersetzung (Optional)', 'حفظ القصة': 'Speichern', 'إلغاء': 'Abbrechen',
      'إعدادات حكمة': 'Hikma-Einstellungen', 'العمر والواجهة': 'Alter & Oberfläche', 'أقل من 16 سنة': 'Unter 16',
      '16 سنة أو أكثر': '16 oder älter', 'المساعدة وإمكانية الوصول': 'Barrierefreiheit & Hilfe',
      'خيارات إمكانية الوصول': 'Barrierefreiheit-Optionen', 'شخصية القلم': 'Stift-Charakter', 'المظهر': 'Erscheinungsbild',
      'لغة التطبيق': 'App-Sprache', 'لغة القراءة': 'Lesesprache', 'الأصل': 'Original',
      'العربية': 'Arabisch', 'حكاية عربية': 'Arabisches Märchen', 'English story': 'Englische Geschichte',
      'سرعة القراءة': 'Lesegeschwindigkeit', 'طبقة الصوت': 'Tonhöhe', 'هادئة': 'Ruhiger', 'أسرع': 'Schneller',
      'أخفض': 'Tiefer', 'أعلى': 'Höher', 'الجملة السابقة': 'Vorheriger Satz', 'الجملة التالية': 'Nächster Satz',
      'تشغيل القراءة': 'Vorlesen abspielen', 'إيقاف مؤقت': 'Pause', 'متابعة القراءة من بداية الجملة': 'Am Satzanfang fortsetzen',
      'إعادة القراءة': 'Wiederholen', 'تشغيل بصوت الجهاز': 'Gerätestimme nutzen',
      'تشكيل النص العربي': 'Arabische Vokalisierung', 'إيقاف التشكيل': 'Ohne Vokalisierung',
      'تحرير الترجمة يدويًا': 'Übersetzung manuell bearbeiten', 'النص المترجم': 'Übersetzter Text',
      'حفظ الترجمة': 'Übersetzung sichern', 'حفظ موضعي الحالي': 'Lesezeichen setzen',
      'الانتقال للعلامة المحفوظة': 'Zum Lesezeichen springen', 'ملاحظتي': 'Meine Notiz', 'حفظ الملاحظة': 'Notiz speichern',
      'إغلاق': 'Schließen', 'تفعيل الوضع التجريبي': 'Im lokalen Demo-Modus fortfahren', 'التحقق من الرمز': 'Code prüfen',
      'رمز التفعيل': 'Aktivierungscode', 'تباعد الأسطر': 'Zeilenabstand', 'حجم النص': 'Schriftgröße',
      'داكن': 'Dunkel', 'فاتح': 'Hell', 'إضافة صوت بشري': 'Echte Stimme hinzufügen', 'إدارة الصوت البشري': 'Aufnahme verwalten',
      'حفظ الصوت': 'Audio speichern', 'حذف': 'Löschen', 'التقدم': 'Fortschritt', 'قصتي': 'Meine Geschichte',
      'اختيار لغة التطبيق': 'Sprache auswählen', 'أهلاً بيك في حكمة': 'Willkommen bei Hikma',
      'هل عمرك 16 سنة أو أكثر؟': 'Bist du 16 Jahre oder älter?', 'تحب نفعّل وضع المساعدة؟': 'Barrierefreiheit aktivieren?',
      'القراءة': 'Lesen', 'الصوت والقراءة': 'Stimme & Lesen', 'مثال: مغامرة في الغابة': 'z. B. Abenteuer im Zauberwald',
      'اكتب أو الصق قصتك هنا...': 'Schreibe oder füge deine Geschichte hier ein...',
      'أضف ترجمة القصة للغة الأخرى': 'Füge eine Übersetzung in einer anderen Sprache hinzu',
      'لا توجد قصص هنا بعد': 'Hier sind noch keine Geschichten',
      'جرّب كلمة بحث أخرى أو أضف قصة جديدة.': 'Versuche einen anderen Begriff oder erstelle eine neue Geschichte.',
      'صوت بشري للقصة': 'Menschliche Sprachaufnahme', 'استمع للتسجيل': 'Aufnahme anhören',
      'اختيار ملف صوتي': 'Audiodatei auswählen', 'تسجيل من الميكروفون': 'Mit Mikrofon aufnehmen',
      'ابدأ التسجيل': 'Aufnahme starten', 'إيقاف التسجيل': 'Aufnahme beenden',
      'قلم حكمة الذكي': 'Hikma Smart-Stift', 'ميدالية وجدتها': 'Wajadtaha Finder-Tag',
      'متصل بالبلوتوث': 'Bluetooth verbunden', 'غير متصل': 'Getrennt',
      'وضع القلم التفاعلي': 'Interaktiver Stift-Modus',
      'امسح كود الكتاب': 'Buch-Code scannen', 'ماسح الكتب وكود QR': 'Buch- & QR-Scanner',
      'استكشاف اللور وقصص الويب': 'Web- & Lore-Explorer', 'لور وقصص الألعاب': 'Spiele-Lore & Geschichten',
      'أضف ملاحظة': 'Notiz hinzufügen', 'ملاحظات الكتاب': 'Buchnotizen', 'حقيبة المذاكرة الذكية': 'Smarte Lerntasche',
      'آخر موقع معروف': 'Letzter bekannter GPS-Standort', 'زر الطوارئ SOS': 'SOS-Notfalltaste',
      'التعرف التلقائي على اللغة (IP)': 'Sprache automatisch nach Standort (IP) ermitteln'
    },
    es: {
      'نقرأها سوا': 'Leamos Juntos', 'إعدادات الصوت': 'Ajustes de Voz', 'قصة جديدة': 'Nueva Historia',
      'كل قصة، عالم جديد.': 'Cada historia es un mundo nuevo.',
      'اختار حكايتك وخلي حكمة تقرأها معاك، أو أضف نصك الخاص.': 'Elige un cuento para que Hikma lo lea contigo o escribe el tuyo.',
      'مكتبتك': 'Tu Biblioteca', 'ابحث في القصص': 'Buscar historias', 'ابحث عن قصة...': 'Buscar una historia...',
      'فلترة القصص': 'Filtrar historias', 'كل القصص': 'Todas las historias', 'قصصي': 'Mis Historias', 'المكتبة': 'Biblioteca',
      'إضافة': 'Añadir', 'إضافة قصة': 'Añadir Historia', 'الصوت': 'Voz', 'الإعدادات': 'Ajustes',
      'إضافة قصة للمكتبة': 'Añadir a la biblioteca', 'عنوان القصة': 'Título de la historia', 'النص': 'Texto',
      'الترجمة (اختياري)': 'Traducción (Opcional)', 'حفظ القصة': 'Guardar Historia', 'إلغاء': 'Cancelar',
      'إعدادات حكمة': 'Ajustes de Hikma', 'العمر والواجهة': 'Edad e Interfaz', 'أقل من 16 سنة': 'Menor de 16',
      '16 سنة أو أكثر': '16 o más', 'المساعدة وإمكانية الوصول': 'Accesibilidad y Ayuda',
      'خيارات إمكانية الوصول': 'Opciones de Accesibilidad', 'شخصية القلم': 'Personaje del lápiz', 'المظهر': 'Apariencia',
      'لغة التطبيق': 'Idioma de la App', 'لغة القراءة': 'Idioma de Lectura', 'الأصل': 'Original',
      'العربية': 'Árabe', 'حكاية عربية': 'Cuento árabe', 'English story': 'Cuento en inglés',
      'سرعة القراءة': 'Velocidad de lectura', 'طبقة الصوت': 'Tono de voz', 'هادئة': 'Pausada', 'أسرع': 'Más rápida',
      'أخفض': 'Más grave', 'أعلى': 'Más aguda', 'الجملة السابقة': 'Frase anterior', 'الجملة التالية': 'Frase siguiente',
      'تشغيل القراءة': 'Reproducir lectura', 'إيقاف مؤقت': 'Pausa', 'متابعة القراءة من بداية الجملة': 'Reanudar desde el inicio',
      'إعادة القراءة': 'Reiniciar lectura', 'تشغيل بصوت الجهاز': 'Voz del dispositivo',
      'تشكيل النص العربي': 'Añadir signos diacríticos', 'إيقاف التشكيل': 'Sin diacríticos',
      'تحرير الترجمة يدويًا': 'Editar traducción manualmente', 'النص المترجم': 'Texto traducido',
      'حفظ الترجمة': 'Guardar traducción', 'حفظ موضعي الحالي': 'Guardar marcador',
      'الانتقال للعلامة المحفوظة': 'Ir al marcador', 'ملاحظتي': 'Mi nota', 'حفظ الملاحظة': 'Guardar nota',
      'إغلاق': 'Cerrar', 'تفعيل الوضع التجريبي': 'Continuar en modo demo local', 'التحقق من الرمز': 'Comprobar código',
      'رمز التفعيل': 'Código de activación', 'تباعد الأسطر': 'Interlineado', 'حجم النص': 'Tamaño de texto',
      'داكن': 'Oscuro', 'فاتح': 'Claro', 'إضافة صوت بشري': 'Añadir voz humana', 'إدارة الصوت البشري': 'Gestionar grabación',
      'حفظ الصوت': 'Guardar audio', 'حذف': 'Eliminar', 'التقدم': 'Progreso', 'قصتي': 'Mi Historia',
      'اختيار لغة التطبيق': 'Elegir idioma', 'أهلاً بيك في حكمة': '¡Te damos la bienvenida a Hikma!',
      'هل عمرك 16 سنة أو أكثر؟': '¿Tienes 16 años o más?', 'تحب نفعّل وضع المساعدة؟': '¿Deseas activar el modo de accesibilidad?',
      'القراءة': 'Lectura', 'الصوت والقراءة': 'Voz y Lectura', 'مثال: مغامرة في الغابة': 'Ejemplo: Aventura en el bosque',
      'اكتب أو الصق قصتك هنا...': 'Escribe o pega tu cuento aquí...',
      'أضف ترجمة القصة للغة الأخرى': 'Añade una traducción en otro idioma',
      'لا توجد قصص هنا بعد': 'Aún no hay historias aquí',
      'جرّب كلمة بحث أخرى أو أضف قصة جديدة.': 'Prueba otra búsqueda o crea una nueva historia.',
      'صوت بشري للقصة': 'Grabación con voz humana', 'استمع للتسجيل': 'Escuchar grabación',
      'اختيار ملف صوتي': 'Seleccionar archivo de audio', 'تسجيل من الميكروفون': 'Grabar con micrófono',
      'ابدأ التسجيل': 'Iniciar grabación', 'إيقاف التسجيل': 'Detener grabación',
      'قلم حكمة الذكي': 'Lápiz Inteligente Hikma', 'ميدالية وجدتها': 'Localizador Wajadtaha',
      'متصل بالبلوتوث': 'Conectado por Bluetooth', 'غير متصل': 'Desconectado',
      'وضع القلم التفاعلي': 'Modo de toque con lápiz',
      'امسح كود الكتاب': 'Escanear código del libro', 'ماسح الكتب وكود QR': 'Escáner de libros y QR',
      'استكشاف اللور وقصص الويب': 'Explorador de Lore y Web', 'لور وقصص الألعاب': 'Lore y cuentos de juegos',
      'أضف ملاحظة': 'Añadir nota', 'ملاحظات الكتاب': 'Notas del libro', 'حقيبة المذاكرة الذكية': 'Mochila de Estudio Inteligente',
      'آخر موقع معروف': 'Última ubicación GPS conocida', 'زر الطوارئ SOS': 'Botón de Emergencia SOS',
      'التعرف التلقائي على اللغة (IP)': 'Detectar idioma automáticamente por ubicación (IP)'
    },
    zh: {
      'نقرأها سوا': '一起阅读', 'إعدادات الصوت': '语音设置', 'قصة جديدة': '添加新故事',
      'كل قصة، عالم جديد.': '每一个故事，都是一个全新的世界。',
      'اختار حكايتك وخلي حكمة تقرأها معاك، أو أضف نصك الخاص.': '选择一段故事让 Hikma 读给你听，或创建专属文本。',
      'مكتبتك': '你的书库', 'ابحث في القصص': '搜索故事', 'ابحث عن قصة...': '搜索故事标题或内容...',
      'فلترة القصص': '故事筛选', 'كل القصص': '全部故事', 'قصصي': '我的创作', 'المكتبة': '书库',
      'إضافة': '添加', 'إضافة قصة': '添加故事', 'الصوت': '语音', 'الإعدادات': '设置',
      'إضافة قصة للمكتبة': '将故事加入书库', 'عنوان القصة': '故事标题', 'النص': '故事正文',
      'الترجمة (اختياري)': '译文（选填）', 'حفظ القصة': '保存故事', 'إلغاء': '取消',
      'إعدادات حكمة': 'Hikma 系统设置', 'العمر والواجهة': '年龄与界面', 'أقل من 16 سنة': '16岁以下',
      '16 سنة أو أكثر': '16岁及以上', 'المساعدة وإمكانية الوصول': '辅助与无障碍',
      'خيارات إمكانية الوصول': '无障碍辅助选项', 'شخصية القلم': '点读笔角色', 'المظهر': '界面外观',
      'لغة التطبيق': '应用语言', 'لغة القراءة': '朗读语言', 'الأصل': '原文语言',
      'العربية': '阿拉伯语', 'حكاية عربية': '阿拉伯语故事', 'English story': '英语故事',
      'سرعة القراءة': '朗读速度', 'طبقة الصوت': '语音音调', 'هادئة': '舒缓', 'أسرع': '加快',
      'أخفض': '低沉', 'أعلى': '清脆', 'الجملة السابقة': '上一句', 'الجملة التالية': '下一句',
      'تشغيل القراءة': '开始朗读', 'إيقاف مؤقت': '暂停', 'متابعة القراءة من بداية الجملة': '从句首继续朗读',
      'إعادة القراءة': '重新朗读', 'تشغيل بصوت الجهاز': '设备内置发音',
      'تشكيل النص العربي': '显示发音标音符', 'إيقاف التشكيل': '隐藏标音符',
      'تحرير الترجمة يدويًا': '手动校对翻译', 'النص المترجم': '翻译文本',
      'حفظ الترجمة': '保存译文', 'حفظ موضعي الحالي': '记录书签位置',
      'الانتقال للعلامة المحفوظة': '跳转至书签', 'ملاحظتي': '我的笔记', 'حفظ الملاحظة': '保存笔记',
      'إغلاق': '关闭', 'تفعيل الوضع التجريبي': '进入本地演示模式', 'التحقق من الرمز': '验证代码',
      'رمز التفعيل': '激活码', 'تباعد الأسطر': '行间距', 'حجم النص': '字号大小',
      'داكن': '深色模式', 'فاتح': '浅色模式', 'إضافة صوت بشري': '添加真人配音', 'إدارة الصوت البشري': '管理录音文件',
      'حفظ الصوت': '保存音频', 'حذف': '删除', 'التقدم': '阅读进度', 'قصتي': '我的故事',
      'اختيار لغة التطبيق': '切换语言', 'أهلاً بيك في حكمة': '欢迎来到 Hikma',
      'هل عمرك 16 سنة أو أكثر؟': '您是否已满 16 岁？', 'تحب نفعّل وضع المساعدة؟': '是否开启无障碍辅助体验？',
      'القراءة': '故事阅读', 'الصوت والقراءة': '朗读与控制', 'مثال: مغامرة في الغابة': '例如：森林奇遇记',
      'اكتب أو الصق قصتك هنا...': '在此输入或粘贴您的故事...',
      'أضف ترجمة القصة للغة الأخرى': '为故事添加另一种语言的对照翻译',
      'لا توجد قصص هنا بعد': '书库暂无故事',
      'جرّب كلمة بحث أخرى أو أضف قصة جديدة.': '请尝试不同关键词搜索，或添加一篇新故事。',
      'صوت بشري للقصة': '真人原声朗读', 'استمع للتسجيل': '试听录音',
      'اختيار ملف صوتي': '选择本地音频', 'تسجيل من الميكروفون': '麦克风实时录音',
      'ابدأ التسجيل': '开始录音', 'إيقاف التسجيل': '停止录音',
      'قلم حكمة الذكي': 'Hikma 智能点读笔', 'ميدالية وجدتها': 'Wajadtaha 防丢追踪器',
      'متصل بالبلوتوث': '蓝牙已连接', 'غير متصل': '未连接',
      'وضع القلم التفاعلي': '点读笔互动模式',
      'امسح كود الكتاب': '扫描实体书二维码', 'ماسح الكتب وكود QR': '智能扫书与二维码有声书',
      'استكشاف اللور وقصص الويب': '网页与游戏故事探索', 'لور وقصص الألعاب': '英雄联盟背景故事与奇幻传说',
      'أضف ملاحظة': '添加行间笔记', 'ملاحظات الكتاب': '本书笔记集', 'حقيبة المذاكرة الذكية': '智能学习组合包',
      'آخر موقع معروف': 'GPS 最后记录定位', 'زر الطوارئ SOS': 'SOS 紧急求助按钮',
      'التعرف التلقائي على اللغة (IP)': '根据地理位置自动检测语言 (IP)'
    },
    tr: {
      'نقرأها سوا': 'Birlikte Okuyalım', 'إعدادات الصوت': 'Ses Ayarları', 'قصة جديدة': 'Yeni Hikaye',
      'كل قصة، عالم جديد.': 'Her hikaye, yepyeni bir dünya.',
      'اختار حكايتك وخلي حكمة تقرأها معاك، أو أضف نصك الخاص.': 'Hikma’nın okuması için bir masal seçin veya kendi metninizi ekleyin.',
      'مكتبتك': 'Kütüphaneniz', 'ابحث في القصص': 'Hikayelerde ara', 'ابحث عن قصة...': 'Hikaye ara...',
      'فلترة القصص': 'Filtrele', 'كل القصص': 'Tüm Hikayeler', 'قصصي': 'Hikayelerim', 'المكتبة': 'Kütüphane',
      'إضافة': 'Ekle', 'إضافة قصة': 'Hikaye Ekle', 'الصوت': 'Ses', 'الإعدادات': 'Ayarlar',
      'إضافة قصة للمكتبة': 'Kütüphaneye Hikaye Ekle', 'عنوان القصة': 'Hikaye Başlığı', 'النص': 'Hikaye Metni',
      'الترجمة (اختياري)': 'Çeviri (İsteğe Bağlı)', 'حفظ القصة': 'Hikayeyi Kaydet', 'إلغاء': 'İptal',
      'إعدادات حكمة': 'Hikma Ayarları', 'العمر والواجهة': 'Yaş & Arayüz', 'أقل من 16 سنة': '16 Yaş Altı',
      '16 سنة أو أكثر': '16 Yaş ve Üzeri', 'المساعدة وإمكانية الوصول': 'Erişilebilirlik ve Yardım',
      'خيارات إمكانية الوصول': 'Erişilebilirlik Seçenekleri', 'شخصية القلم': 'Kalem Karakteri', 'المظهر': 'Görünüm',
      'لغة التطبيق': 'Uygulama Dili', 'لغة القراءة': 'Okuma Dili', 'الأصل': 'Orijinal',
      'العربية': 'Arapça', 'حكاية عربية': 'Arapça Masal', 'English story': 'İngilizce Hikaye',
      'سرعة القراءة': 'Okuma Hızı', 'طبقة الصوت': 'Ses Tonu', 'هادئة': 'Yavaş', 'أسرع': 'Daha Hızlı',
      'أخفض': 'Daha Kalın', 'أعلى': 'Daha Tiz', 'الجملة السابقة': 'Önceki Cümle', 'الجملة التالية': 'Sonraki Cümle',
      'تشغيل القراءة': 'Okumayı Başlat', 'إيقاف مؤقت': 'Duraklat', 'متابعة القراءة من بداية الجملة': 'Cümle başından sürdür',
      'إعادة القراءة': 'Tekrar Oku', 'تشغيل بصوت الجهاز': 'Cihaz Sesiyle Oku',
      'تشكيل النص العربي': 'Arapça Harekeleri Göster', 'إيقاف التشكيل': 'Harekeleri Gizle',
      'تحرير الترجمة يدويًا': 'Çeviriyi Düzenle', 'النص المترجم': 'Çevrilen Metin',
      'حفظ الترجمة': 'Çeviriyi Kaydet', 'حفظ موضعي الحالي': 'Kaldığım Yeri Kaydet',
      'الانتقال للعلامة المحفوظة': 'Yer İmine Git', 'ملاحظتي': 'Notum', 'حفظ الملاحظة': 'Notu Kaydet',
      'إغلاق': 'Kapat', 'تفعيل الوضع التجريبي': 'Yerel Demo ile Devam Et', 'التحقق من الرمز': 'Kodu Doğrula',
      'رمز التفعيل': 'Aktivasyon Kodu', 'تباعد الأسطر': 'Satır Aralığı', 'حجم النص': 'Yazı Boyutu',
      'داكن': 'Karanlık', 'فاتح': 'Aydınlık', 'إضافة صوت بشري': 'İnsan Sesi Ekle', 'إدارة الصوت البشري': 'Kaydı Yönet',
      'حفظ الصوت': 'Sesi Kaydet', 'حذف': 'Sil', 'التقدم': 'İlerleme', 'قصتي': 'Hikayem',
      'اختيار لغة التطبيق': 'Dil Seçin', 'أهلاً بيك في حكمة': 'Hikma’ya Hoş Geldiniz',
      'هل عمرك 16 سنة أو أكثر؟': '16 yaşında veya daha büyük müsünüz?', 'تحب نفعّل وضع المساعدة؟': 'Erişilebilirlik modunu açalım mı?',
      'القراءة': 'Okuma', 'الصوت والقراءة': 'Ses ve Okuma', 'مثال: مغامرة في الغابة': 'Örnek: Orman Macerası',
      'اكتب أو الصق قصتك هنا...': 'Hikayenizi buraya yazın veya yapıştırın...',
      'أضف ترجمة القصة للغة الأخرى': 'Diğer dilde çevirisini ekleyin',
      'لا توجد قصص هنا بعد': 'Henüz hikaye yok',
      'جرّب كلمة بحث أخرى أو أضف قصة جديدة.': 'Farklı bir arama yapın veya yeni bir hikaye ekleyin.',
      'صوت بشري للقصة': 'İnsan Sesli Anlatım', 'استمع للتسجيل': 'Kaydı Dinle',
      'اختيار ملف صوتي': 'Ses Dosyası Seç', 'تسجيل من الميكروفون': 'Mikrofondan Kaydet',
      'ابدأ التسجيل': 'Kayda Başla', 'إيقاف التسجيل': 'Kaydı Durdur',
      'قلم حكمة الذكي': 'Hikma Akıllı Kalem', 'ميدالية وجدتها': 'Wajadtaha Takip Etiketi',
      'متصل بالبلوتوث': 'Bluetooth Bağlandı', 'غير متصل': 'Bağlantı Yok',
      'وضع القلم التفاعلي': 'İnteraktif Kalem Modu',
      'امسح كود الكتاب': 'Kitap Kodunu Tara', 'ماسح الكتب وكود QR': 'Akıllı Kitap & QR Tarayıcı',
      'استكشاف اللور وقصص الويب': 'Oyun Lore & Web Hikayeleri', 'لور وقصص الألعاب': 'Oyun Hikayeleri ve Efsaneler',
      'أضف ملاحظة': 'Not Ekle', 'ملاحظات الكتاب': 'Kitap Notları', 'حقيبة المذاكرة الذكية': 'Akıllı Çalışma Çantası',
      'آخر موقع معروف': 'Son Bilinen GPS Konumu', 'زر الطوارئ SOS': 'SOS Acil Durum Butonu',
      'التعرف التلقائي على اللغة (IP)': 'Konuma Göre Dili Otomatik Belirle (IP)'
    },
    it: {
      'نقرأها سوا': 'Leggiamo Insieme', 'إعدادات الصوت': 'Impostazioni Voce', 'قصة جديدة': 'Nuova Storia',
      'كل قصة، عالم جديد.': 'Ogni storia è un nuovo mondo.',
      'اختار حكايتك وخلي حكمة تقرأها معاك، أو أضف نصك الخاص.': 'Scegli una storia da far leggere a Hikma o aggiungi il tuo testo.',
      'مكتبتك': 'La Tua Libreria', 'ابحث في القصص': 'Cerca storie', 'ابحث عن قصة...': 'Cerca una storia...',
      'فلترة القصص': 'Filtra', 'كل القصص': 'Tutte le Storie', 'قصصي': 'Le Mie Storie', 'المكتبة': 'Libreria',
      'إضافة': 'Aggiungi', 'إضافة قصة': 'Aggiungi Storia', 'الصوت': 'Voce', 'الإعدادات': 'Impostazioni',
      'إضافة قصة للمكتبة': 'Aggiungi alla Libreria', 'عنوان القصة': 'Titolo della storia', 'النص': 'Testo',
      'الترجمة (اختياري)': 'Traduzione (Opzionale)', 'حفظ القصة': 'Salva Storia', 'إلغاء': 'Annulla',
      'إعدادات حكمة': 'Impostazioni Hikma', 'العمر والواجهة': 'Età e Interfaccia', 'أقل من 16 سنة': 'Meno di 16 anni',
      '16 سنة أو أكثر': '16 anni o più', 'المساعدة وإمكانية الوصول': 'Accessibilità & Aiuto',
      'خيارات إمكانية الوصول': 'Opzioni di Accessibilità', 'شخصية القلم': 'Personaggio Penna', 'المظهر': 'Aspetto',
      'لغة التطبيق': 'Lingua dell’app', 'لغة القراءة': 'Lingua di Lettura', 'الأصل': 'Originale',
      'العربية': 'Arabo', 'حكاية عربية': 'Fiaba araba', 'English story': 'Storia in inglese',
      'سرعة القراءة': 'Velocità di lettura', 'طبقة الصوت': 'Tonalità', 'هادئة': 'Più lenta', 'أسرع': 'Più veloce',
      'أخفض': 'Più grave', 'أعلى': 'Più acuta', 'الجملة السابقة': 'Frase precedente', 'الجملة التالية': 'Frase successiva',
      'تشغيل القراءة': 'Avvia lettura', 'إيقاف مؤقت': 'Pausa', 'متابعة القراءة من بداية الجملة': 'Riprendi da inizio frase',
      'إعادة القراءة': 'Rileggi dall’inizio', 'تشغيل بصوت الجهاز': 'Voce del dispositivo',
      'تشكيل النص العربي': 'Segni diacritici arabi', 'إيقاف التشكيل': 'Disattiva diacritici',
      'تحرير الترجمة يدويًا': 'Modifica traduzione', 'النص المترجم': 'Testo tradotto',
      'حفظ الترجمة': 'Salva traduzione', 'حفظ موضعي الحالي': 'Salva segnalibro',
      'الانتقال للعلامة المحفوظة': 'Vai al segnalibro', 'ملاحظتي': 'La mia nota', 'حفظ الملاحظة': 'Salva nota',
      'إغلاق': 'Chiudi', 'تفعيل الوضع التجريبي': 'Continua in demo locale', 'التحقق من الرمز': 'Verifica codice',
      'رمز التفعيل': 'Codice di attivazione', 'تباعد الأسطر': 'Interlinea', 'حجم النص': 'Dimensione testo',
      'داكن': 'Scuro', 'فاتح': 'Chiaro', 'إضافة صوت بشري': 'Aggiungi voce umana', 'إدارة الصوت البشري': 'Gestisci registrazione',
      'حفظ الصوت': 'Salva audio', 'حذف': 'Elimina', 'التقدم': 'Progresso', 'قصتي': 'La mia storia',
      'اختيار لغة التطبيق': 'Scegli lingua', 'أهلاً بيك في حكمة': 'Benvenuto su Hikma',
      'هل عمرك 16 سنة أو أكثر؟': 'Hai 16 anni o più?', 'تحب نفعّل وضع المساعدة؟': 'Attivare la modalità accessibile?',
      'القراءة': 'Lettura', 'الصوت والقراءة': 'Voce & Lettura', 'مثال: مغامرة في الغابة': 'Esempio: Avventura nel bosco',
      'اكتب أو الصق قصتك هنا...': 'Scrivi o incolla qui la tua storia...',
      'أضف ترجمة القصة للغة الأخرى': 'Aggiungi una traduzione in un’altra lingua',
      'لا توجد قصص هنا بعد': 'Nessuna storia presente',
      'جرّب كلمة بحث أخرى أو أضف قصة جديدة.': 'Prova con un’altra ricerca o aggiungi una storia.',
      'صوت بشري للقصة': 'Lettura con voce umana', 'استمع للتسجيل': 'Ascolta registrazione',
      'اختيار ملف صوتي': 'Seleziona file audio', 'تسجيل من الميكروفون': 'Registra con microfono',
      'ابدأ التسجيل': 'Avvia registrazione', 'إيقاف التسجيل': 'Ferma registrazione',
      'قلم حكمة الذكي': 'Penna Smart Hikma', 'ميدالية وجدتها': 'Tag Anti-smarrimento Wajadtaha',
      'متصل بالبلوتوث': 'Bluetooth Connesso', 'غير متصل': 'Disconnesso',
      'وضع القلم التفاعلي': 'Modalità tocco con penna',
      'امسح كود الكتاب': 'Scansiona codice del libro', 'ماسح الكتب وكود QR': 'Scanner di libri & QR',
      'استكشاف اللور وقصص الويب': 'Esploratore Lore & Web', 'لور وقصص الألعاب': 'Lore di giochi e racconti',
      'أضف ملاحظة': 'Aggiungi nota', 'ملاحظات الكتاب': 'Note del libro', 'حقيبة المذاكرة الذكية': 'Zaino di Studio Intelligente',
      'آخر موقع معروف': 'Ultima posizione GPS nota', 'زر الطوارئ SOS': 'Pulsante di Emergenza SOS',
      'التعرف التلقائي على اللغة (IP)': 'Riconoscimento automatico lingua per posizione (IP)'
    },
    ru: {
      'نقرأها سوا': 'Читаем Вместе', 'إعدادات الصوت': 'Настройки Голоса', 'قصة جديدة': 'Новая История',
      'كل قصة، عالم جديد.': 'Каждая история — это целый новый мир.',
      'اختار حكايتك وخلي حكمة تقرأها معاك، أو أضف نصك الخاص.': 'Выберите сказку для чтения с Hikma или добавьте свой текст.',
      'مكتبتك': 'Ваша Библиотека', 'ابحث في القصص': 'Поиск историй', 'ابحث عن قصة...': 'Найти историю...',
      'فلترة القصص': 'Фильтр', 'كل القصص': 'Все Истории', 'قصصي': 'Мои Истории', 'المكتبة': 'Библиотека',
      'إضافة': 'Добавить', 'إضافة قصة': 'Добавить историю', 'الصوت': 'Голос', 'الإعدادات': 'Настройки',
      'إضافة قصة للمكتبة': 'Добавить в библиотеку', 'عنوان القصة': 'Название', 'النص': 'Текст истории',
      'الترجمة (اختياري)': 'Перевод (необязательно)', 'حفظ القصة': 'Сохранить', 'إلغاء': 'Отмена',
      'إعدادات حكمة': 'Настройки Hikma', 'العمر والواجهة': 'Возраст и интерфейс', 'أقل من 16 سنة': 'Младше 16 лет',
      '16 سنة أو أكثر': '16 лет и старше', 'المساعدة وإمكانية الوصول': 'Специальные возможности',
      'خيارات إمكانية الوصول': 'Параметры доступности', 'شخصية القلم': 'Персонаж ручки', 'المظهر': 'Внешний вид',
      'لغة التطبيق': 'Язык приложения', 'لغة القراءة': 'Язык чтения', 'الأصل': 'Оригинал',
      'العربية': 'Арабский', 'حكاية عربية': 'Арабская сказка', 'English story': 'Английский рассказ',
      'سرعة القراءة': 'Скорость чтения', 'طبقة الصوت': 'Высота голоса', 'هادئة': 'Медленнее', 'أسرع': 'Быстрее',
      'أخفض': 'Ниже', 'أعلى': 'Выше', 'الجملة السابقة': 'Предыдущее предложение', 'الجملة التالية': 'Следующее предложение',
      'تشغيل القراءة': 'Начать чтение', 'إيقاف مؤقت': 'Пауза', 'متابعة القراءة من بداية الجملة': 'Продолжить с начала фразы',
      'إعادة القراءة': 'Читать заново', 'تشغيل بصوت الجهاز': 'Голос устройства',
      'تشكيل النص العربي': 'Арабская огласовка (ташкиль)', 'إيقاف التشكيل': 'Без огласовки',
      'تحرير الترجمة يدويًا': 'Редактировать перевод', 'النص المترجم': 'Переведенный текст',
      'حفظ الترجمة': 'Сохранить перевод', 'حفظ موضعي الحالي': 'Поставить закладку',
      'الانتقال للعلامة المحفوظة': 'К закладке', 'ملاحظتي': 'Моя заметка', 'حفظ الملاحظة': 'Сохранить заметку',
      'إغلاق': 'Закрыть', 'تفعيل الوضع التجريبي': 'Продолжить в демо-режиме', 'التحقق من الرمز': 'Проверить код',
      'رمز التفعيل': 'Код активации', 'تباعد الأسطر': 'Межстрочный интервал', 'حجم النص': 'Размер шрифта',
      'داكن': 'Тёмная', 'فاتح': 'Светлая', 'إضافة صوت بشري': 'Добавить живой голос', 'إدارة الصوت البشري': 'Управление записью',
      'حفظ الصوت': 'Сохранить аудио', 'حذف': 'Удалить', 'التقدم': 'Прогресс', 'قصتي': 'Моя история',
      'اختيار لغة التطبيق': 'Выбрать язык', 'أهلاً بيك في حكمة': 'Добро пожаловать в Hikma',
      'هل عمرك 16 سنة أو أكثر؟': 'Вам 16 лет или больше?', 'تحب نفعّل وضع المساعدة؟': 'Включить режим доступности?',
      'القراءة': 'Чтение', 'الصوت والقراءة': 'Голос и чтение', 'مثال: مغامرة في الغابة': 'Пример: Приключения в лесу',
      'اكتب أو الصق قصتك هنا...': 'Напишите или вставьте историю сюда...',
      'أضف ترجمة القصة للغة الأخرى': 'Добавьте перевод на другой язык',
      'لا توجد قصص هنا بعد': 'Здесь пока нет историй',
      'جرّب كلمة بحث أخرى أو أضف قصة جديدة.': 'Попробуйте другой запрос или создайте историю.',
      'صوت بشري للقصة': 'Живой голос', 'استمع للتسجيل': 'Прослушать запись',
      'اختيار ملف صوتي': 'Выбрать аудиофайл', 'تسجيل من الميكروفون': 'Запись с микрофона',
      'ابدأ التسجيل': 'Начать запись', 'إيقاف التسجيل': 'Остановить запись',
      'قلم حكمة الذكي': 'Умная Ручка Hikma', 'ميدالية وجدتها': 'Брелок-поисковик Wajadtaha',
      'متصل بالبلوتوث': 'Bluetooth подключен', 'غير متصل': 'Отключено',
      'وضع القلم التفاعلي': 'Интерактивный режим указки',
      'امسح كود الكتاب': 'Сканировать QR книги', 'ماسح الكتب وكود QR': 'Сканер книг и QR-аудиокниг',
      'استكشاف اللور وقصص الويب': 'Веб-истории и Лор игр', 'لور وقصص الألعاب': 'Игровой Лор и Легенды',
      'أضف ملاحظة': 'Добавить заметку', 'ملاحظات الكتاب': 'Заметки к книге', 'حقيبة المذاكرة الذكية': 'Умный комплект ученика',
      'آخر موقع معروف': 'Последнее GPS-местоположение', 'زر الطوارئ SOS': 'Кнопка тревоги SOS',
      'التعرف التلقائي على اللغة (IP)': 'Автоопределение языка по локации (IP)'
    },
    ja: {
      'نقرأها سوا': 'いっしょに読もう', 'إعدادات الصوت': '音声設定', 'قصة جديدة': '新しいお話',
      'كل قصة، عالم جديد.': 'すべての物語は、新しい世界へのとびら。',
      'اختار حكايتك وخلي حكمة تقرأها معاك، أو أضف نصك الخاص.': 'Hikmaと一緒に読むお話を選ぶか、自分で物語を作ってみましょう。',
      'مكتبتك': 'マイライブラリ', 'ابحث في القصص': '物語を検索', 'ابحث عن قصة...': 'お話を検索...',
      'فلترة القصص': '絞り込み', 'كل القصص': 'すべての物語', 'قصصي': '自分のお話', 'المكتبة': 'ライブラリ',
      'إضافة': '追加', 'إضافة قصة': '物語を追加', 'الصوت': '音声', 'الإعدادات': '設定',
      'إضافة قصة للمكتبة': 'ライブラリにお話を追加', 'عنوان القصة': 'タイトル', 'النص': '本文',
      'الترجمة (اختياري)': '翻訳（任意）', 'حفظ القصة': 'お話を保存', 'إلغاء': 'キャンセル',
      'إعدادات حكمة': 'Hikma 設定', 'العمر والواجهة': '年齢とデザイン', 'أقل من 16 سنة': '16歳未満',
      '16 سنة أو أكثر': '16歳以上', 'المساعدة وإمكانية الوصول': 'アクセシビリティ支援',
      'خيارات إمكانية الوصول': 'ユーザー補助機能', 'شخصية القلم': 'ペンのキャラクター', 'المظهر': 'テーマ設定',
      'لغة التطبيق': 'アプリの言語', 'لغة القراءة': '朗読の言語', 'الأصل': '原文の言語',
      'العربية': 'アラビア語', 'حكاية عربية': 'アラビアの物語', 'English story': '英語の物語',
      'سرعة القراءة': '朗読スピード', 'طبقة الصوت': '声のトーン', 'هادئة': 'ゆっくり', 'أسرع': 'はやめ',
      'أخفض': '低め', 'أعلى': '高め', 'الجملة السابقة': '前の文', 'الجملة التالية': '次の文',
      'تشغيل القراءة': '朗読スタート', 'إيقاف مؤقت': '一時停止', 'متابعة القراءة من بداية الجملة': '文頭から再開',
      'إعادة القراءة': '最初からもう一度', 'تشغيل بصوت الجهاز': '端末の音声で再生',
      'تشكيل النص العربي': 'アラビア語母音記号を表示', 'إيقاف التشكيل': '母音記号を非表示',
      'تحرير الترجمة يدويًا': '翻訳を手動編集', 'النص المترجم': '翻訳テキスト',
      'حفظ الترجمة': '翻訳を保存', 'حفظ موضعي الحالي': 'しおりを挟む',
      'الانتقال للعلامة المحفوظة': 'しおりの位置へ', 'ملاحظتي': 'メモ', 'حفظ الملاحظة': 'メモを保存',
      'إغلاق': '閉じる', 'تفعيل الوضع التجريبي': 'デモモードで続ける', 'التحقق من الرمز': 'コードを確認',
      'رمز التفعيل': '認証コード', 'تباعد الأسطر': '行間', 'حجم النص': '文字サイズ',
      'داكن': 'ダーク', 'فاتح': 'ライト', 'إضافة صوت بشري': '肉声録音を追加', 'إدارة الصوت البشري': '録音の管理',
      'حفظ الصوت': '音声を保存', 'حذف': '削除', 'التقدم': '読書進捗', 'قصتي': '私のお話',
      'اختيار لغة التطبيق': '言語を選択', 'أهلاً بيك في حكمة': 'Hikmaへようこそ',
      'هل عمرك 16 سنة أو أكثر؟': '16歳以上ですか？', 'تحب نفعّل وضع المساعدة؟': 'アクセシビリティ補助を有効にしますか？',
      'القراءة': '読書モード', 'الصوت والقراءة': '音声と読書', 'مثال: مغامرة في الغابة': '例：森の冒険',
      'اكتب أو الصق قصتك هنا...': 'ここにお話を入力または貼り付けてください...',
      'أضف ترجمة القصة للغة الأخرى': '別言語の対訳を追加',
      'لا توجد قصص هنا بعد': 'まだお話がありません',
      'جرّب كلمة بحث أخرى أو أضف قصة جديدة.': '別のキーワードで検索するか、新しい物語を追加してください。',
      'صوت بشري للقصة': '人間の朗読音声', 'استمع للتسجيل': '録音を聴く',
      'اختيار ملف صوتي': '音声ファイルを選択', 'تسجيل من الميكروفون': 'マイクから録音',
      'ابدأ التسجيل': '録音開始', 'إيقاف التسجيل': '録音停止',
      'قلم حكمة الذكي': 'Hikma スマートペン', 'ميدالية وجدتها': 'Wajadtaha 紛失防止タグ',
      'متصل بالبلوتوث': 'Bluetooth 接続中', 'غير متصل': '未接続',
      'وضع القلم التفاعلي': 'ペンタッチ読み上げモード',
      'امسح كود الكتاب': '本のコードをスキャン', 'ماسح الكتب وكود QR': 'スマート本＆QRスキャナー',
      'استكشاف اللور وقصص الويب': 'ゲームロア＆ウェブ物語探索', 'لور وقصص الألعاب': 'LoLロア＆ゲーム物語',
      'أضف ملاحظة': 'メモを追加', 'ملاحظات الكتاب': '本のメモ帳', 'حقيبة المذاكرة الذكية': 'スマート学習セット',
      'آخر موقع معروف': '最後に確認されたGPS位置', 'زر الطوارئ SOS': '緊急SOSボタン',
      'التعرف التلقائي على اللغة (IP)': '位置情報から自動で言語を設定 (IP)'
    },
    pt: {
      'نقرأها سوا': 'Vamos Ler Juntos', 'إعدادات الصوت': 'Ajustes de Voz', 'قصة جديدة': 'Nova História',
      'كل قصة، عالم جديد.': 'Cada história é um mundo totalmente novo.',
      'اختار حكايتك وخلي حكمة تقرأها معاك، أو أضف نصك الخاص.': 'Escolha uma história para o Hikma ler em voz alta ou crie a sua.',
      'مكتبتك': 'Sua Biblioteca', 'ابحث في القصص': 'Pesquisar histórias', 'ابحث عن قصة...': 'Buscar uma história...',
      'فلترة القصص': 'Filtrar', 'كل القصص': 'Todas as Histórias', 'قصصي': 'Minhas Histórias', 'المكتبة': 'Biblioteca',
      'إضافة': 'Adicionar', 'إضافة قصة': 'Adicionar História', 'الصوت': 'Voz', 'الإعدادات': 'Configurações',
      'إضافة قصة للمكتبة': 'Adicionar à Biblioteca', 'عنوان القصة': 'Título da História', 'النص': 'Texto da História',
      'الترجمة (اختياري)': 'Tradução (Opcional)', 'حفظ القصة': 'Salvar História', 'إلغاء': 'Cancelar',
      'إعدادات حكمة': 'Configurações do Hikma', 'العمر والواجهة': 'Idade e Interface', 'أقل من 16 سنة': 'Menor de 16',
      '16 سنة أو أكثر': '16 anos ou mais', 'المساعدة وإمكانية الوصول': 'Acessibilidade & Ajuda',
      'خيارات إمكانية الوصول': 'Opções de Acessibilidade', 'شخصية القلم': 'Personagem da Caneta', 'المظهر': 'Aparência',
      'لغة التطبيق': 'Idioma do App', 'لغة القراءة': 'Idioma de Leitura', 'الأصل': 'Original',
      'العربية': 'Árabe', 'حكاية عربية': 'Conto árabe', 'English story': 'História em inglês',
      'سرعة القراءة': 'Velocidade de leitura', 'طبقة الصوت': 'Tom da voz', 'هادئة': 'Mais calma', 'أسرع': 'Mais rápida',
      'أخفض': 'Mais grave', 'أعلى': 'Mais aguda', 'الجملة السابقة': 'Frase anterior', 'الجملة التالية': 'Próxima frase',
      'تشغيل القراءة': 'Iniciar leitura', 'إيقاف مؤقت': 'Pausar', 'متابعة القراءة من بداية الجملة': 'Retomar do início da frase',
      'إعادة القراءة': 'Recomeçar', 'تشغيل بصوت الجهاز': 'Voz do dispositivo',
      'تشكيل النص العربي': 'Sinais diacríticos árabes', 'إيقاف التشكيل': 'Sem diacríticos',
      'تحرير الترجمة يدويًا': 'Editar tradução manualmente', 'النص المترجم': 'Texto traduzido',
      'حفظ الترجمة': 'Salvar tradução', 'حفظ موضعي الحالي': 'Marcar página',
      'الانتقال للعلامة المحفوظة': 'Ir para o marcador', 'ملاحظتي': 'Minha nota', 'حفظ الملاحظة': 'Salvar nota',
      'إغلاق': 'Fechar', 'تفعيل الوضع التجريبي': 'Continuar no modo demonstração', 'التحقق من الرمز': 'Verificar código',
      'رمز التفعيل': 'Código de ativação', 'تباعد الأسطر': 'Espaçamento de linhas', 'حجم النص': 'Tamanho da fonte',
      'داكن': 'Escuro', 'فاتح': 'Claro', 'إضافة صوت بشري': 'Adicionar voz humana', 'إدارة الصوت البشري': 'Gerenciar gravação',
      'حفظ الصوت': 'Salvar áudio', 'حذف': 'Excluir', 'التقدم': 'Progresso', 'قصتي': 'Minha História',
      'اختيار لغة التطبيق': 'Escolher idioma', 'أهلاً بيك في حكمة': 'Boas-vindas ao Hikma',
      'هل عمرك 16 سنة أو أكثر؟': 'Você tem 16 anos ou mais?', 'تحب نفعّل وضع المساعدة؟': 'Deseja ativar recursos de acessibilidade?',
      'القراءة': 'Leitura', 'الصوت والقراءة': 'Voz e Leitura', 'مثال: مغامرة في الغابة': 'Exemplo: Aventura na Floresta',
      'اكتب أو الصق قصتك هنا...': 'Escreva ou cole sua história aqui...',
      'أضف ترجمة القصة للغة الأخرى': 'Adicione a tradução em outro idioma',
      'لا توجد قصص هنا بعد': 'Ainda não há histórias aqui',
      'جرّب كلمة بحث أخرى أو أضف قصة جديدة.': 'Tente outra busca ou crie uma nova história.',
      'صوت بشري للقصة': 'Gravação de voz humana', 'استمع للتسجيل': 'Ouvir gravação',
      'اختيار ملف صوتي': 'Selecionar arquivo de áudio', 'تسجيل من الميكروفون': 'Gravar pelo microfone',
      'ابدأ التسجيل': 'Iniciar gravação', 'إيقاف التسجيل': 'Parar gravação',
      'قلم حكمة الذكي': 'Caneta Inteligente Hikma', 'ميدالية وجدتها': 'Localizador Wajadtaha',
      'متصل بالبلوتوث': 'Bluetooth Conectado', 'غير متصل': 'Desconectado',
      'وضع القلم التفاعلي': 'Modo toque com caneta',
      'امسح كود الكتاب': 'Escanear código do livro', 'ماسح الكتب وكود QR': 'Scanner de Livros e QR',
      'استكشاف اللور وقصص الويب': 'Explorador de Lore e Web', 'لور وقصص الألعاب': 'Lore de Jogos e Lendas',
      'أضف ملاحظة': 'Adicionar nota', 'ملاحظات الكتاب': 'Notas do Livro', 'حقيبة المذاكرة الذكية': 'Kit de Estudos Inteligente',
      'آخر موقع معروف': 'Última localização GPS conhecida', 'زر الطوارئ SOS': 'Botão de Emergência SOS',
      'التعرف التلقائي على اللغة (IP)': 'Detectar idioma automaticamente por localização (IP)'
    },
    id: {
      'نقرأها سوا': 'Ayo Membaca Bersama', 'إعدادات الصوت': 'Pengaturan Suara', 'قصة جديدة': 'Cerita Baru',
      'كل قصة، عالم جديد.': 'Setiap cerita adalah dunia baru yang memukau.',
      'اختار حكايتك وخلي حكمة تقرأها معاك، أو أضف نصك الخاص.': 'Pilih cerita agar Hikma membacakannya untukmu, atau tulis ceritamu sendiri.',
      'مكتبتك': 'Perpustakaanmu', 'ابحث في القصص': 'Cari cerita', 'ابحث عن قصة...': 'Cari cerita...',
      'فلترة القصص': 'Filter cerita', 'كل القصص': 'Semua Cerita', 'قصصي': 'Ceritaku', 'المكتبة': 'Perpustakaan',
      'إضافة': 'Tambah', 'إضافة قصة': 'Tambah Cerita', 'الصوت': 'Suara', 'الإعدادات': 'Pengaturan',
      'إضافة قصة للمكتبة': 'Tambahkan Cerita ke Perpustakaan', 'عنوان القصة': 'Judul Cerita', 'النص': 'Teks Cerita',
      'الترجمة (اختياري)': 'Terjemahan (Opsional)', 'حفظ القصة': 'Simpan Cerita', 'إلغاء': 'Batal',
      'إعدادات حكمة': 'Pengaturan Hikma', 'العمر والواجهة': 'Usia & Tampilan', 'أقل من 16 سنة': 'Di bawah 16 tahun',
      '16 سنة أو أكثر': '16 tahun ke atas', 'المساعدة وإمكانية الوصول': 'Aksesibilitas & Bantuan',
      'خيارات إمكانية الوصول': 'Pilihan Aksesibilitas', 'شخصية القلم': 'Karakter Pena', 'المظهر': 'Tema',
      'لغة التطبيق': 'Bahasa Aplikasi', 'لغة القراءة': 'Bahasa Membaca', 'الأصل': 'Bahasa Asli',
      'العربية': 'Bahasa Arab', 'حكاية عربية': 'Kisah Bahasa Arab', 'English story': 'Cerita Bahasa Inggris',
      'سرعة القراءة': 'Kecepatan Membaca', 'طبقة الصوت': 'Nada Suara', 'هادئة': 'Lambat', 'أسرع': 'Lebih Cepat',
      'أخفض': 'Lebih Berat', 'أعلى': 'Lebih Tinggi', 'الجملة السابقة': 'Kalimat Sebelumnya', 'الجملة التالية': 'Kalimat Berikutnya',
      'تشغيل القراءة': 'Mulai Membaca', 'إيقاف مؤقت': 'Jeda', 'متابعة القراءة من بداية الجملة': 'Lanjutkan dari awal kalimat',
      'إعادة القراءة': 'Ulangi Cerita', 'تشغيل بصوت الجهاز': 'Gunakan Suara Perangkat',
      'تشكيل النص العربي': 'Tampilkan Harakat Arab', 'إيقاف التشكيل': 'Sembunyikan Harakat',
      'تحرير الترجمة يدويًا': 'Edit Terjemahan Manual', 'النص المترجم': 'Teks Terjemahan',
      'حفظ الترجمة': 'Simpan Terjemahan', 'حفظ موضعي الحالي': 'Simpan Penanda Buku',
      'الانتقال للعلامة المحفوظة': 'Ke Penanda Buku', 'ملاحظتي': 'Catatanku', 'حفظ الملاحظة': 'Simpan Catatan',
      'إغلاق': 'Tutup', 'تفعيل الوضع التجريبي': 'Lanjutkan di Mode Demo', 'التحقق من الرمز': 'Periksa Kode',
      'رمز التفعيل': 'Kode Aktivasi', 'تباعد الأسطر': 'Jarak Baris', 'حجم النص': 'Ukuran Huruf',
      'داكن': 'Gelap', 'فاتح': 'Terang', 'إضافة صوت بشري': 'Tambah Suara Manusia', 'إدارة الصوت البشري': 'Kelola Rekaman',
      'حفظ الصوت': 'Simpan Audio', 'حذف': 'Hapus', 'التقدم': 'Kemajuan', 'قصتي': 'Ceritaku',
      'اختيار لغة التطبيق': 'Pilih Bahasa', 'أهلاً بيك في حكمة': 'Selamat Datang di Hikma',
      'هل عمرك 16 سنة أو أكثر؟': 'Apakah kamu berusia 16 tahun ke atas?', 'تحب نفعّل وضع المساعدة؟': 'Aktifkan mode aksesibilitas?',
      'القراءة': 'Membaca', 'الصوت والقراءة': 'Suara & Membaca', 'مثال: مغامرة في الغابة': 'Contoh: Petualangan di Hutan',
      'اكتب أو الصق قصتك هنا...': 'Tulis atau tempel ceritamu di sini...',
      'أضف ترجمة القصة للغة الأخرى': 'Tambahkan terjemahan dalam bahasa lain',
      'لا توجد قصص هنا بعد': 'Belum ada cerita di sini',
      'جرّب كلمة بحث أخرى أو أضف قصة جديدة.': 'Coba kata kunci lain atau tambahkan cerita baru.',
      'صوت بشري للقصة': 'Rekaman Suara Manusia', 'استمع للتسجيل': 'Dengarkan Rekaman',
      'اختيار ملف صوتي': 'Pilih Berkas Audio', 'تسجيل من الميكروفون': 'Rekam via Mikrofon',
      'ابدأ التسجيل': 'Mulai Rekam', 'إيقاف التسجيل': 'Hentikan Rekam',
      'قلم حكمة الذكي': 'Pena Pintar Hikma', 'ميدالية وجدتها': 'Gantungan Pelacak Wajadtaha',
      'متصل بالبلوتوث': 'Bluetooth Terhubung', 'غير متصل': 'Terputus',
      'وضع القلم التفاعلي': 'Mode Sentuhan Pena Interaktif',
      'امسح كود الكتاب': 'Pindai Kode Buku', 'ماسح الكتب وكود QR': 'Pemindai Buku & QR Pintar',
      'استكشاف اللور وقصص الويب': 'Eksplorasi Lore & Kisah Web', 'لور وقصص الألعاب': 'Kisah Game & Legenda',
      'أضف ملاحظة': 'Tambah Catatan', 'ملاحظات الكتاب': 'Catatan Buku', 'حقيبة المذاكرة الذكية': 'Paket Belajar Pintar',
      'آخر موقع معروف': 'Lokasi GPS Terakhir yang Diketahui', 'زر الطوارئ SOS': 'Tombol Darurat SOS',
      'التعرف التلقائي على اللغة (IP)': 'Deteksi Bahasa Otomatis Berdasarkan Lokasi (IP)'
    },
    ur: {
      'نقرأها سوا': 'آئیے مل کر پڑھیں', 'إعدادات الصوت': 'آواز کی ترتیبات', 'قصة جديدة': 'نئی کہانی',
      'كل قصة، عالم جديد.': 'ہر کہانی، ایک نئی دنیا۔',
      'اختار حكايتك وخلي حكمة تقرأها معاك، أو أضف نصك الخاص.': 'کوئی کہانی منتخب کریں تاکہ حِکمہ آپ کے ساتھ پڑھے یا اپنا متن شامل کریں۔',
      'مكتبتك': 'آپ کی لائبریری', 'ابحث في القصص': 'کہانیوں میں تلاش کریں', 'ابحث عن قصة...': 'کوئی کہانی تلاش کریں...',
      'فلترة القصص': 'کہانیاں فلٹر کریں', 'كل القصص': 'تمام کہانیاں', 'قصصي': 'میری کہانیاں', 'المكتبة': 'لائبریری',
      'إضافة': 'شامل کریں', 'إضافة قصة': 'کہانی شامل کریں', 'الصوت': 'آواز', 'الإعدادات': 'ترتیبات',
      'إضافة قصة للمكتبة': 'لائبریری میں کہانی شامل کریں', 'عنوان القصة': 'کہانی کا عنوان', 'النص': 'کہانی کا متن',
      'الترجمة (اختياري)': 'ترجمہ (اختیاری)', 'حفظ القصة': 'کہانی محفوظ کریں', 'إلغاء': 'منسوخ',
      'إعدادات حكمة': 'حکمہ ترتیبات', 'العمر والواجهة': 'عمر اور انٹرفیس', 'أقل من 16 سنة': '16 سال سے کم',
      '16 سنة أو أكثر': '16 سال یا اس سے زیادہ', 'المساعدة وإمكانية الوصول': 'رسائی اور معاونت',
      'خيارات إمكانية الوصول': 'آسان رسائی کے اختیارات', 'شخصية القلم': 'قلم کا کردار', 'المظهر': 'ظاہری وضع',
      'لغة التطبيق': 'ایپ کی زبان', 'لغة القراءة': 'پڑھنے کی زبان', 'الأصل': 'اصل زبان',
      'العربية': 'عربی', 'حكاية عربية': 'عربی کہانی', 'English story': 'انگریزی کہانی',
      'سرعة القراءة': 'پڑھنے کی رفتار', 'طبقة الصوت': 'آواز کا سر', 'هادئة': 'آہستہ', 'أسرع': 'تیز',
      'أخفض': 'بھاری', 'أعلى': 'باریک', 'الجملة السابقة': 'پچھلا جملہ', 'الجملة التالية': 'اگلا جملہ',
      'تشغيل القراءة': 'پڑھنا شروع کریں', 'إيقاف مؤقت': 'وقفہ', 'متابعة القراءة من بداية الجملة': 'جملے کے آغاز سے جاری رکھیں',
      'إعادة القراءة': 'دوبارہ پڑھیں', 'تشغيل بصوت الجهاز': 'ڈیوائس کی آواز',
      'تشكيل النص العربي': 'اعراب شامل کریں', 'إيقاف التشكيل': 'اعراب ہٹائیں',
      'تحرير الترجمة يدويًا': 'ترجمہ خود درست کریں', 'النص المترجم': 'ترجمہ شدہ متن',
      'حفظ الترجمة': 'ترجمہ محفوظ کریں', 'حفظ موضعي الحالي': 'موجودہ صفحہ محفوظ کریں',
      'الانتقال للعلامة المحفوظة': 'نشان زدہ مقام پر جائیں', 'ملاحظتي': 'میری یادداشت', 'حفظ الملاحظة': 'یادداشت محفوظ کریں',
      'إغلاق': 'بند کریں', 'تفعيل الوضع التجريبي': 'مقامی ڈیمو جاری رکھیں', 'التحقق من الرمز': 'کوڈ کی تصدیق',
      'رمز التفعيل': 'ایکٹیویشن کوڈ', 'تباعد الأسطر': 'سطروں کا فاصلہ', 'حجم النص': 'حروف کا سائز',
      'داكن': 'ڈارک موڈ', 'فاتح': 'لائٹ موڈ', 'إضافة صوت بشري': 'انسانی آواز شامل کریں', 'إدارة الصوت البشري': 'آواز کا انتظام',
      'حفظ الصوت': 'آواز محفوظ کریں', 'حذف': 'حذف کریں', 'التقدم': 'پیش رفت', 'قصتي': 'میری کہانی',
      'اختيار لغة التطبيق': 'زبان منتخب کریں', 'أهلاً بيك في حكمة': 'حِکمہ میں خوش آمدید',
      'هل عمرك 16 سنة أو أكثر؟': 'کیا آپ کی عمر 16 سال یا اس سے زیادہ ہے؟', 'تحب نفعّل وضع المساعدة؟': 'کیا آپ رسائی موڈ آن کرنا چاہتے ہیں؟',
      'القراءة': 'مطالعہ', 'الصوت والقراءة': 'آواز اور مطالعہ', 'مثال: مغامرة في الغابة': 'مثال: جنگل کا ایڈونچر',
      'اكتب أو الصق قصتك هنا...': 'یہاں اپنی کہانی لکھیں یا چسپاں کریں...',
      'أضف ترجمة القصة للغة الأخرى': 'کسی دوسری زبان میں ترجمہ شامل کریں',
      'لا توجد قصص هنا بعد': 'یہاں ابھی تک کوئی کہانی نہیں ہے',
      'جرّب كلمة بحث أخرى أو أضف قصة جديدة.': 'تلاش کا کوئی دوسرا لفظ آزمائیں یا نئی کہانی شامل کریں۔',
      'صوت بشري للقصة': 'انسانی آواز کی ریکارڈنگ', 'استمع للتسجيل': 'ریکارڈنگ سنیں',
      'اختيار ملف صوتي': 'آڈیو فائل منتخب کریں', 'تسجيل من الميكروفون': 'مائیکروفون سے ریکارڈ کریں',
      'ابدأ التسجيل': 'ریکارڈنگ شروع کریں', 'إيقاف التسجيل': 'ریکارڈنگ بند کریں',
      'قلم حكمة الذكي': 'حِکمہ اسمارٹ قلم', 'ميدالية وجدتها': 'وجدتها گمشدگی سے بچاؤ کا ٹیگ',
      'متصل بالبلوتوث': 'بلوٹوتھ منسلک ہے', 'غير متصل': 'غیر منسلک',
      'وضع القلم التفاعلي': 'انٹرایکٹو قلم ٹچ موڈ',
      'امسح كود الكتاب': 'کتاب کا کوڈ اسکین کریں', 'ماسح الكتب وكود QR': 'اسمارٹ کتاب اور QR اسکینر',
      'استكشاف اللور وقصص الويب': 'ویب اور گیمز کی کہانیاں', 'لور وقصص الألعاب': 'لیگ آف لیجنڈز اور گیم کہانیاں',
      'أضف ملاحظة': 'نوٹ شامل کریں', 'ملاحظات الكتاب': 'کتاب کے نوٹس', 'حقيبة المذاكرة الذكية': 'اسمارٹ اسٹڈی بیگ',
      'آخر موقع معروف': 'آخری معلوم GPS مقام', 'زر الطوارئ SOS': 'ہنگامی SOS بٹن',
      'التعرف التلقائي على اللغة (IP)': 'مقام کی بنیاد پر خودکار زبان کا تعین (IP)'
    }
  };

  const nodeSources = new WeakMap();
  const skipSelector = 'script,style,textarea,input,.story-desc,.reading-text,.active-word,.gate-error';
  let activeLanguage = 'ar';
  let observer;

  function normalizeLanguage(value) {
    const code = String(value || '').toLowerCase().split(/[-_]/)[0];
    return languages.includes(code) ? code : 'ar';
  }

  function detectLanguage(preferences = globalThis.navigator?.languages || [globalThis.navigator?.language]) {
    for (const preference of preferences || []) {
      const code = String(preference || '').toLowerCase().split(/[-_]/)[0];
      if (languages.includes(code)) return code;
    }
    return 'ar';
  }

  async function detectLanguageByIp() {
    // 1. Try backend health API (which reads Vercel / Cloudflare country headers)
    try {
      if (typeof window !== 'undefined' && window.HikmaApi?.health) {
        const health = await window.HikmaApi.health();
        if (health?.recommendedLanguage && languages.includes(health.recommendedLanguage)) {
          return health.recommendedLanguage;
        }
      }
    } catch {}

    // 2. Client-side IP country lookup (fallback for static host / local dev / offline)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch('https://api.country.is/', {signal: controller.signal});
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        const country = String(data?.country || '').toUpperCase();
        const countryMap = {
          SA: 'ar', EG: 'ar', AE: 'ar', QA: 'ar', KW: 'ar', BH: 'ar', OM: 'ar',
          JO: 'ar', LB: 'ar', SY: 'ar', IQ: 'ar', PS: 'ar', YE: 'ar', LY: 'ar',
          SD: 'ar', DZ: 'ar', MA: 'ar', TN: 'ar', MR: 'ar', SO: 'ar',
          FR: 'fr', MC: 'fr', BE: 'fr', DE: 'de', AT: 'de', CH: 'de',
          ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es',
          CN: 'zh', TW: 'zh', HK: 'zh', TR: 'tr', IT: 'it', RU: 'ru',
          JP: 'ja', BR: 'pt', PT: 'pt', ID: 'id', PK: 'ur',
          US: 'en', GB: 'en', CA: 'en', AU: 'en'
        };
        if (countryMap[country] && languages.includes(countryMap[country])) {
          return countryMap[country];
        }
      }
    } catch {}

    // 3. Fallback to browser preferences
    return detectLanguage();
  }

  function mapFor(language) {
    return dictionaries[language] || {};
  }

  function translateNode(node, dictionary) {
    const parent = node.parentElement;
    if (!parent || parent.closest(skipSelector)) return;
    const current = nodeSources.get(node) ?? node.nodeValue;
    nodeSources.set(node, current);
    const trimmed = current.trim();
    if (!trimmed) return;
    const translated = dictionary[trimmed] || (activeLanguage !== 'en' ? dictionaries.en?.[trimmed] : null) || trimmed;
    const nextValue = current.replace(trimmed, translated);
    if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
  }

  function translateAttributes(element, dictionary) {
    for (const attribute of ['aria-label', 'title', 'placeholder']) {
      const value = element.getAttribute(attribute);
      if (!value) continue;
      const sourceKey = `data-hikma-${attribute}`;
      if (!element.hasAttribute(sourceKey)) element.setAttribute(sourceKey, value);
      const source = element.getAttribute(sourceKey);
      const translated = dictionary[source] || (activeLanguage !== 'en' ? dictionaries.en?.[source] : null) || source;
      if (value !== translated) element.setAttribute(attribute, translated);
    }
  }

  function translateTree(root = document.body) {
    if (!root) return;
    const dictionary = mapFor(activeLanguage);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateNode(node, dictionary);
    if (root.nodeType === Node.ELEMENT_NODE) translateAttributes(root, dictionary);
    root.querySelectorAll?.('*').forEach(element => translateAttributes(element, dictionary));
  }

  function setLanguage(language) {
    activeLanguage = normalizeLanguage(language);
    const root = document.documentElement;
    root.lang = activeLanguage;
    root.dir = rtlLanguages.includes(activeLanguage) ? 'rtl' : 'ltr';
    const localizedTitle = mapFor(activeLanguage)['مكتبتك'] || 'Library';
    document.title = activeLanguage === 'ar' ? 'حِكمة | مكتبة القراءة' : `${localizedTitle} | Hikma`;
    translateTree();
    document.dispatchEvent(new CustomEvent('hikma:languagechange', {detail: {language: activeLanguage}}));
    return activeLanguage;
  }

  function observeBody() {
    if (!document.body || observer) return;
    observer = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'characterData') translateNode(record.target, mapFor(activeLanguage));
        if (record.type === 'attributes') translateAttributes(record.target, mapFor(activeLanguage));
        for (const node of record.addedNodes || []) {
          if (node.nodeType === Node.TEXT_NODE) translateNode(node, mapFor(activeLanguage));
          else if (node.nodeType === Node.ELEMENT_NODE) translateTree(node);
        }
      }
    });
    observer.observe(document.body, {subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['aria-label', 'title', 'placeholder']});
    translateTree(document.body);
  }

  if (typeof document !== 'undefined') {
    if (document.body) observeBody();
    else document.addEventListener('DOMContentLoaded', observeBody, {once: true});
  }

  globalThis.HikmaI18n = {
    languages,
    languageNames,
    rtlLanguages,
    dictionaries,
    detectLanguage,
    detectLanguageByIp,
    normalizeLanguage,
    setLanguage,
    translateTree,
    get language() { return activeLanguage; }
  };
})();
