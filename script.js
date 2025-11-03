// Global variables
let coursesData = [];
let lessonContentData = {};
let isOnLessonPage = false;
    // ... (kode sebelumnya tetap sama) ...

// Download dataset function
function downloadDataset(event, lessonId) {
    event.preventDefault();
    showLoadingSpinner();
    
    // Get dataset info from lesson content
    const lesson = lessonContentData[lessonId];
    if (!lesson || !lesson.dataset) {
        hideLoadingSpinner();
        showNotification('Dataset tidak tersedia!', 'error');
        return;
    }
    
    // Simulate download
    setTimeout(() => {
        hideLoadingSpinner();
        
        // Create a temporary link to download the file
        const link = document.createElement('a');
        link.href = `datasets/${lesson.dataset.fileName}`;
        link.download = lesson.dataset.fileName;
        link.style.display = 'none';
        
        // Add to document and click
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        
        showNotification(`Dataset ${lesson.dataset.fileName} berhasil diunduh!`);
    }, 500);
}

// ... (kode setelahnya tetap sama) ...
    // Simulate download
    setTimeout(() => {
        hideLoadingSpinner();
        
        // Create CSV content
        const csvContent = generateCSVContent(lesson.dataset.fileName);
        
        // Create blob and download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', lesson.dataset.fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        URL.revokeObjectURL(url);
        
        showNotification(`Dataset ${lesson.dataset.fileName} berhasil diunduh!`);
    }, 1000);

// Generate CSV content based on file name
function generateCSVContent(fileName) {
    const csvData = {
        'vlookup_dataset.csv': `ID Karyawan,Nama,Departemen,Posisi,Gaji,Tanggal Bergabung,Akhir Masa Percobaan
E001,John Smith,HR,Manager,75000000,15/01/2023,15/04/2023
E002,Jane Doe,Finance,Analyst,65000000,22/03/2023,22/06/2023
E003,Mike Johnson,IT,Developer,80000000,10/06/2023,10/09/2023
E004,Sarah Williams,Marketing,Specialist,60000000,05/02/2023,05/05/2023
E005,David Brown,Sales,Executive,70000000,12/01/2023,12/04/2023
E006,Emily Davis,HR,Coordinator,55000000,18/03/2023,18/06/2023
E007,Michael Wilson,Finance,Manager,85000000,25/01/2023,25/04/2023
E008,Jessica Martinez,IT,Analyst,68000000,08/02/2023,08/05/2023
E009,Robert Taylor,Sales,Representative,52000000,14/03/2023,14/06/2023
E010,Lisa Anderson,Marketing,Manager,78000000,20/01/2023,20/04/2023`,
        
        'xlookup_dataset.csv': `Pelanggan,Produk,Jumlah,Tanggal
Ahmed,Laptop,12000000,15/01/2023
Sara,Handphone,8000000,20/02/2023
Ahmed,Monitor,3000000,10/03/2023
Sara,Tablet,5000000,15/03/2023
Budi,Keyboard,1500000,25/01/2023
Dewi,Mouse,800000,05/02/2023
Budi,Webcam,2000000,12/03/2023
Dewi,Headset,1200000,18/03/2023
Rani,Speaker,3500000,22/01/2023
Doni,Microphone,1800000,28/02/2023`,
        
        'let_function_dataset.csv': `Nilai 1,Nilai 2,Hasil
10,5,15
20,8,28
15,7,22
Bulan,Penjualan
Januari,1500000
Februari,1200000
Maret,1300000
Siswa,Skor,Nilai
John,88,B
Jane,92,A
Mike,78,C
Tekanan (P),Volume (V),Hasil
500,0.04,166.28
600,0.05,249.42
700,0.03,174.59
Hari,Pengeluaran
Senin,50000
Selasa,75000
Rabu,60000
Kamis,
Jumat,
Nama,Sapaan
Waqas,Halo Waqas!
Sara,Halo Sara!
Ahmed,Halo Ahmed!
Produk,Kuantitas,Status
Laptop,50,Rendah
Handphone,150,Tinggi
Tablet,80,Rendah
Item,Unit,Digandakan
Produk A,5,10
Produk B,8,16
Produk C,12,24
Karyawan,Gaji
John,50000000
Jane,55000000
Mike,60000000
Nama Depan,Nama Belakang,Nama Lengkap
Ahmed,Riaz,Ahmed Riaz
Sara,Khan,Sara Khan
Mike Johnson,Mike Johnson
Produk,Harga,Pajak
Laptop,2500000,250000
Handphone,800000,80000
Tablet,600000,60000
Lingkaran,Jari-jari,Luas
Lingkaran 1,7,153.94
Lingkaran 2,5,78.54
Lingkaran 3,10,314.16
Nilai 1,Nilai 2,Hasil
15,10,X lebih besar
8,12,Y lebih besar
20,20,X lebih besar
Angka,Status
15,Positif
-8,Negatif
0,Negatif
Angka,Dikuadratkan
2,4
4,16
6,36
Pokok,Suku,Peracikan/Tahun,Tahun,Jumlah
1000000,5%,12,5,1283359
2000000,4%,4,10,2966723
5000000,6%,2,8,8038539
Produk,Jan,Feb,Mar
Produk A,100,120,110
Produk B,80,90,95
Produk C,150,160,170
Kode Kota,Nama Kota
NYC,New York
LAX,Los Angeles
CHI,Chicago`,
        
        'index_match_xmatch_dataset.csv': `ID Karyawan,Nama,Departemen,Job Role,Gaji,Pengalaman,Rating
E001,Ali,IT,Developer,65000000,3,4.2
E002,Sara,HR,HR Manager,95000000,7,4.7
E003,Ahmed,Finance,Koordinator,55000000,2,3.8
E004,Rida,HR,Trainer,72000000,5,4.3
E005,Kamran,IT,Developer,70000000,4,4.1
E006,Asif,Finance,Asisten,45000000,1,3.5
E007,Sana,HR,HR Manager,85000000,7,4.8
E008,Zainab,IT,Developer,75000000,6,4.5
E009,Bilal,Finance,Koordinator,60000000,3,4.0
E010,Nadia,HR,Trainer,68000000,4,4.2`
    };
    
    return csvData[fileName] || '';
}

// ... (kode setelahnya tetap sama) ...
// Load data from JSON file
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        coursesData = data.courses;
        lessonContentData = data.lessonContent;
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    const data = await loadData();
    if (data) {
        loadCourses();
        initializeEventListeners();
    }
});

// Initialize event listeners
function initializeEventListeners() {
    // Show loading spinner when navigating
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            
            // Special handling for navigation when on lesson page
            if (isOnLessonPage && (targetId === 'home' || targetId === 'courses' || targetId === 'about' || targetId === 'contact')) {
                e.preventDefault();
                showLoadingSpinner();
                
                setTimeout(() => {
                    loadHomePage();
                    hideLoadingSpinner();
                    
                    // Scroll to the target section
                    if (document.getElementById(targetId)) {
                        document.getElementById(targetId).scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }, 500);
                return;
            }
            
            if (targetId && document.getElementById(targetId)) {
                e.preventDefault();
                showLoadingSpinner();
                
                setTimeout(() => {
                    document.getElementById(targetId).scrollIntoView({
                        behavior: 'smooth'
                    });
                    hideLoadingSpinner();
                }, 300);
            }
        });
    });
    
    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showLoadingSpinner();
            
            // Simulate form submission
            setTimeout(() => {
                hideLoadingSpinner();
                showNotification('Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.');
                this.reset();
            }, 1500);
        });
    }
}

// Load home page
function loadHomePage() {
    isOnLessonPage = false;
    
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <!-- Courses Section -->
        <section class="lesson-section" id="courses">
            <div class="container">
                <div class="text-center mb-5">
                    <h2 class="section-title">Kursus Excel Tersedia</h2>
                    <p class="section-subtitle">Pilih dari berbagai kursus Excel yang dirancang untuk meningkatkan kemampuan analisis data Anda</p>
                </div>
                
                <div class="row g-4" id="coursesContainer">
                    <!-- Courses will be loaded here -->
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section class="lesson-section bg-light" id="about">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-4">
                        <img src="https://picsum.photos/seed/nicky-profile/400/400.jpg" alt="Nicky - Web Developer" class="img-fluid rounded-circle shadow mb-4 mb-lg-0">
                    </div>
                    <div class="col-lg-8">
                        <h2 class="section-title">Tentang Saya</h2>
                        <div class="about-content">
                            <p>Halo! Saya Nicky, seorang Web Developer dan UI/UX Designer yang juga sedang mendalami dunia data analytics. Website ini saya buat sebagai ruang pembelajaran terbuka bagi siapa pun yang ingin memahami Excel — dari dasar hingga penerapan nyata dalam analisis data.</p>
                            
                            <p>Saya percaya bahwa belajar Excel tidak harus rumit. Dengan pendekatan yang praktis, visual yang intuitif, dan penjelasan yang mudah dipahami, saya berharap website ini bisa menjadi teman belajar yang menyenangkan dan bermanfaat untuk pelajar, profesional, maupun siapa saja yang ingin meningkatkan skill digitalnya.</p>
                            
                            <p>Selain sebagai media edukasi, website ini juga merupakan bagian dari portfolio pribadi saya. Di sini, saya menggabungkan keahlian teknis, desain, dan strategi digital untuk menciptakan pengalaman pengguna yang nyaman dan berdampak. Setiap halaman, konten, dan fitur dirancang dengan semangat berbagi dan eksplorasi.</p>
                            
                            <p>Terima kasih sudah berkunjung. Semoga apa yang saya bagikan bisa membantu perjalanan belajarmu. Jangan ragu untuk menjelajahi, mencoba, dan bertanya — karena belajar adalah proses yang selalu berkembang.</p>
                            
                            <p class="signature">Salam hangat,<br>Nicky</p>
                            
                            <div class="social-links mt-4">
                                <a href="#" class="social-link" aria-label="GitHub">
                                    <i class="fab fa-github"></i>
                                </a>
                                <a href="#" class="social-link" aria-label="LinkedIn">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                                <a href="#" class="social-link" aria-label="Twitter">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a href="#" class="social-link" aria-label="Instagram">
                                    <i class="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="lesson-section" id="contact">
            <div class="container">
                <div class="text-center mb-5">
                    <h2 class="section-title">Hubungi Kami</h2>
                    <p class="section-subtitle">Ada pertanyaan? Jangan ragu untuk menghubungi kami</p>
                </div>
                
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="card border-0 shadow">
                            <div class="card-body p-5">
                                <form id="contactForm">
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <label for="name" class="form-label">Nama Lengkap</label>
                                            <input type="text" class="form-control" id="name" required>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="email" class="form-label">Email</label>
                                            <input type="email" class="form-control" id="email" required>
                                        </div>
                                        <div class="col-12">
                                            <label for="subject" class="form-label">Subjek</label>
                                            <input type="text" class="form-control" id="subject" required>
                                        </div>
                                        <div class="col-12">
                                            <label for="message" class="form-label">Pesan</label>
                                            <textarea class="form-control" id="message" rows="5" required></textarea>
                                        </div>
                                        <div class="col-12 text-center">
                                            <button type="submit" class="btn btn-primary-custom">Kirim Pesan</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Re-initialize event listeners for the new content
    initializeEventListeners();
    
    // Load courses
    loadCourses();
}

// Load courses on page
function loadCourses() {
    const coursesContainer = document.getElementById('coursesContainer');
    if (!coursesContainer) return;
    
    coursesContainer.innerHTML = '';
    
    coursesData.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'col-lg-6 col-md-6';
        courseCard.innerHTML = `
            <div class="course-card">
                <div class="course-image" style="background-image: url('${course.image}');">
                    <span class="course-badge">${course.badge}</span>
                </div>
                <div class="course-content">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    <div class="course-meta">
                        <span><i class="far fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-list-ol"></i> ${course.examples}</span>
                        <span><i class="fas fa-signal"></i> ${course.level}</span>
                    </div>
                    <button class="btn-course" onclick="loadLesson(${course.id})">Pelajari Lebih Lanjut</button>
                </div>
            </div>
        `;
        coursesContainer.appendChild(courseCard);
    });
}

// Load lesson content
function loadLesson(lessonId) {
    showLoadingSpinner();
    
    setTimeout(() => {
        const lesson = lessonContentData[lessonId];
        if (!lesson) {
            hideLoadingSpinner();
            showNotification('Pelajaran tidak ditemukan!', 'error');
            return;
        }
        
        isOnLessonPage = true;
        
        // Build table of contents HTML
        let tableOfContentsHTML = '<ul>';
        lesson.tableOfContents.forEach(item => {
            const anchorId = item.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '');
            tableOfContentsHTML += `<li><a href="#${anchorId}">${item}</a></li>`;
        });
        tableOfContentsHTML += '</ul>';
        
        // Build examples HTML
        let examplesHTML = '';
        if (lesson.examples) {
            lesson.examples.forEach(example => {
                const anchorId = example.title.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '');
                examplesHTML += `
                    <div id="${anchorId}" class="mb-5">
                        <h3>${example.title}</h3>
                        ${example.content}
                    </div>
                `;
            });
        }
        
        // Build dataset HTML
        let datasetHTML = '';
        if (lesson.dataset) {
            datasetHTML = `
                <div class="dataset-section">
                    <h3 class="dataset-title">Dataset untuk Latihan</h3>
                    <p class="dataset-description">${lesson.dataset.description}</p>
                    <a href="${lesson.dataset.downloadLink}" class="btn-download" onclick="downloadDataset(event, ${lessonId})">
                        <i class="fas fa-download"></i> Unduh Dataset
                    </a>
                </div>
            `;
        }
        
        // Build complete lesson HTML
        const lessonHTML = `
            <!-- Breadcrumb Navigation -->
            <div class="breadcrumb-nav">
                <div class="container">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#home">Beranda</a></li>
                            <li class="breadcrumb-item"><a href="#courses">Kursus</a></li>
                            <li class="breadcrumb-item active" aria-current="page">${lesson.title}</li>
                        </ol>
                    </nav>
                </div>
            </div>
            
            <div class="lesson-container">
                <div class="lesson-header">
                    <h1 class="lesson-title">${lesson.title}</h1>
                    <div class="lesson-meta">
                        <span><i class="far fa-clock"></i> 2-3 jam pembelajaran</span>
                        <span><i class="fas fa-signal"></i> Menengah - Lanjutan</span>
                        <span><i class="fas fa-file-download"></i> Dataset tersedia</span>
                    </div>
                </div>
                
                <div class="table-of-contents">
                    <h3>Daftar Isi</h3>
                    ${tableOfContentsHTML}
                </div>
                
                <div class="lesson-content">
                    ${lesson.introduction ? `<h2 id="pengenalan">Pengenalan</h2>${lesson.introduction}` : ''}
                    ${lesson.dataset ? `<h2 id="dataset-yang-digunakan">Dataset yang Digunakan untuk Semua Contoh</h2>${lesson.dataset}` : ''}
                    ${examplesHTML}
                    ${lesson.conclusion ? `<h2 id="kesimpulan">Kesimpulan</h2>${lesson.conclusion}` : ''}
                    ${datasetHTML}
                </div>
            </div>
        `;
        
        // Update main content area
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = lessonHTML;
            
            // Scroll to top of the lesson
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Re-initialize smooth scroll for table of contents links
            initializeSmoothScroll();
        }
        
        hideLoadingSpinner();
    }, 500);
}

// Initialize smooth scrolling for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            if (targetId && document.getElementById(targetId)) {
                e.preventDefault();
                document.getElementById(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Download dataset function
function downloadDataset(event, lessonId) {
    event.preventDefault();
    showLoadingSpinner();
    
    // Simulate download
    setTimeout(() => {
        hideLoadingSpinner();
        showNotification(`Dataset untuk pelajaran ${lessonId} sedang diunduh!`);
        
        // In a real implementation, you would initiate an actual file download here
        // For example: window.location.href = 'path/to/dataset.xlsx';
    }, 1000);
}

// Show loading spinner
function showLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'flex';
    }
}

// Hide loading spinner
function hideLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}