// Data storage
let users = [];
let products = [];
let currentUser = null;

// Initialize with some sample data
function initializeData() {
    // In a real environment, you would load from localStorage:
    // const storedUsers = localStorage.getItem('agroUsers');
    // const storedProducts = localStorage.getItem('agroProducts');
    // users = storedUsers ? JSON.parse(storedUsers) : [default data];
    // products = storedProducts ? JSON.parse(storedProducts) : [default data];
    
    // For this demo, using in-memory storage with sample data
    if (users.length === 0) {
        users = [
            {
                id: 1,
                name: "João Silva",
                email: "joao@teste.com",
                phone: "(11) 99999-9999",
                password: "123456",
                type: "vendedor",
                farmName: "Sítio da Serra",
                farmAddress: "Estrada Rural, 123 - Interior SP",
                categories: ["verduras", "legumes"],
                farmerPage: "sitio-da-serra"
            },
            {
                id: 2,
                name: "Maria Cliente",
                email: "maria@teste.com",
                phone: "(11) 88888-8888",
                password: "123456",
                type: "cliente"
            },
            {
                id: 3,
                name: "Pedro Oliveira",
                email: "pedro@teste.com",
                phone: "(11) 77777-7777",
                password: "123456",
                type: "vendedor",
                farmName: "Fazenda Citrus",
                farmAddress: "Rodovia dos Bandeirantes, km 150",
                categories: ["bebidas"],
                farmerPage: "fazenda-citrus"
            }
        ];
    }
    
    if (products.length === 0) {
        products = [
            {
                id: 1,
                name: "Alface Orgânica",
                category: "verduras",
                price: 3.50,
                unit: "unidade",
                description: "Alface fresca e orgânica, cultivada sem agrotóxicos",
                farmer: {
                    name: "João Silva",
                    phone: "(11) 99999-9999",
                    farm: "Sítio da Serra"
                }
            },
            {
                id: 2,
                name: "Cenoura",
                category: "legumes",
                price: 4.00,
                unit: "kg",
                description: "Cenoura doce e crocante, rica em vitamina A",
                farmer: {
                    name: "Maria Santos",
                    phone: "(11) 88888-8888",
                    farm: "Horta da Maria"
                }
            },
            {
                id: 3,
                name: "Suco de Laranja Natural",
                category: "bebidas",
                price: 8.00,
                unit: "litro",
                description: "Suco 100% natural, sem conservantes nem açúcar adicionado",
                farmer: {
                    name: "Pedro Oliveira",
                    phone: "(11) 77777-7777",
                    farm: "Fazenda Citrus"
                }
            },
            {
                id: 4,
                name: "Tomate Cereja",
                category: "legumes",
                price: 6.50,
                unit: "kg",
                description: "Tomates cereja doces e suculentos",
                farmer: {
                    name: "Ana Costa",
                    phone: "(11) 66666-6666",
                    farm: "Quinta do Vale"
                }
            },
            {
                id: 5,
                name: "Rúcula",
                category: "verduras",
                price: 2.80,
                unit: "maço",
                description: "Rúcula fresca com sabor levemente picante",
                farmer: {
                    name: "Carlos Mendes",
                    phone: "(11) 55555-5555",
                    farm: "Sítio Verde"
                }
            },
            {
                id: 6,
                name: "Kombucha de Gengibre",
                category: "bebidas",
                price: 12.00,
                unit: "litro",
                description: "Bebida probiótica artesanal com gengibre orgânico",
                farmer: {
                    name: "Lucia Ferreira",
                    phone: "(11) 44444-4444",
                    farm: "Fazenda Vida"
                }
            }
        ];
    }
    
    displayProducts();
    checkPageRequest();
}

// Nova função para verificar se há página solicitada na URL
function checkPageRequest() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    if (page) {
        showFarmerPage(page);
    }
}

// Nova função para exibir página do produtor
function showFarmerPage(pageName) {
    const farmer = users.find(u => 
        u.type === 'vendedor' && 
        u.farmerPage && 
        u.farmerPage.toLowerCase() === pageName.toLowerCase()
    );
    
    if (farmer) {
        const farmerProducts = products.filter(p => 
            p.farmer.name === farmer.name
        );
        
        // Cria uma seção especial para o produtor
        const productsSection = document.getElementById('products');
        productsSection.innerHTML = `
            <div class="container">
                <div class="farmer-header" style="background: linear-gradient(135deg, #4caf50, #8bc34a); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; text-align: center;">
                    <h2 style="margin: 0 0 1rem 0; font-size: 2.5rem;">Produtos de ${farmer.name}</h2>
                    <p style="margin: 0.5rem 0; font-size: 1.2rem;">🏡 ${farmer.farmName}</p>
                    <p style="margin: 0.5rem 0; font-size: 1.1rem;">📞 <a href="tel:${farmer.phone}" style="color: white; text-decoration: none;">${farmer.phone}</a></p>
                    <p style="margin: 0.5rem 0; font-size: 1.1rem;">📍 ${farmer.farmAddress}</p>
                    <div style="margin-top: 1rem;">
                        <strong>Especialidades:</strong> ${farmer.categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)).join(', ')}
                    </div>
                </div>
                <div id="productsGrid" class="products-grid"></div>
            </div>
        `;
        
        // Exibe apenas os produtos deste produtor
        displayProducts('', farmerProducts);
        showSection('products');
    } else {
        alert('Página do produtor não encontrada!');
        showSection('home');
    }
}

// Nova função para gerar link da página do produtor
function generateFarmerLink(farmerPage) {
    return `${window.location.origin}${window.location.pathname}?page=${farmerPage}`;
}

// Modal functions
function openModal(modalId) {
    if (modalId === 'addProductModal' && currentUser && currentUser.type === 'vendedor') {
        const categorySelect = document.getElementById('productCategory');
        // Clear existing options except the first one
        while (categorySelect.options.length > 1) {
            categorySelect.remove(1);
        }
        
        // Add only the categories this farmer is registered for
        currentUser.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categorySelect.appendChild(option);
        });
    }
    
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Section navigation
function showSection(sectionName) {
    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
    
    if (sectionName === 'products') {
        displayProducts();
    }
}

// User type toggle
function toggleFarmerFields() {
    const userType = document.getElementById('userType').value;
    const farmerFields = document.getElementById('farmerFields');
    
    if (userType === 'vendedor') {
        farmerFields.classList.remove('hidden');
    } else {
        farmerFields.classList.add('hidden');
    }
}

// Product filtering
function filterProducts(category) {
    if (category) {
        showSection('products');
        document.getElementById('categoryFilter').value = category;
    }
    displayProducts(category);
}

// Display products
function displayProducts(filterCategory = '', productList = null) {
    const productsGrid = document.getElementById('productsGrid');
    const productsToShow = productList || products;
    const filteredProducts = filterCategory 
        ? productsToShow.filter(product => product.category === filterCategory)
        : productsToShow;

    productsGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; color: #666; font-size: 1.2rem;">Nenhum produto encontrado nesta categoria.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Check if farmer has a page
        const farmer = users.find(u => u.name === product.farmer.name && u.type === 'vendedor');
        const farmerLink = farmer && farmer.farmerPage 
            ? `<a href="?page=${farmer.farmerPage}" style="color: #4caf50; text-decoration: none; font-weight: bold;">🏪 Ver página do produtor</a>`
            : '';
        
        productCard.innerHTML = `
            <h4>${product.name}</h4>
            <p style="color: #666; margin-bottom: 1rem;">${product.description}</p>
            <div class="product-price">R$ ${product.price.toFixed(2)}/${product.unit}</div>
            <div class="farmer-info">
                <strong>🧑‍🌾 Produtor:</strong> ${product.farmer.name}<br>
                <strong>🏡 Propriedade:</strong> ${product.farmer.farm}<br>
                <strong>📞 Contato:</strong> <a href="tel:${product.farmer.phone}" style="color: #4caf50; text-decoration: none;">${product.farmer.phone}</a><br>
                ${farmerLink}
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Update authentication buttons
function updateAuthButtons() {
    const authButtons = document.querySelector('.auth-buttons');
    if (currentUser) {
        let farmerPageLink = '';
        if (currentUser.type === 'vendedor' && currentUser.farmerPage) {
            farmerPageLink = `<a href="?page=${currentUser.farmerPage}" class="btn btn-outline" style="margin-right: 0.5rem;">Minha Página</a>`;
        }
        
        authButtons.innerHTML = `
            <span style="color: white; margin-right: 1rem;">Olá, ${currentUser.name}!</span>
            ${farmerPageLink}
            ${currentUser.type === 'vendedor' ? '<button class="btn btn-primary" onclick="openModal(\'addProductModal\')" style="margin-right: 0.5rem;">Adicionar Produto</button>' : ''}
            <button class="btn btn-secondary" onclick="logout()">Sair</button>
        `;
    } else {
        authButtons.innerHTML = `
            <button class="btn btn-secondary" onclick="openModal('loginModal')">Entrar</button>
            <button class="btn btn-primary" onclick="openModal('registerModal')">Cadastrar</button>
        `;
    }
}

// Logout function
function logout() {
    currentUser = null;
    updateAuthButtons();
    showSection('home');
    alert('Logout realizado com sucesso!');
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone format (Brazilian)
function isValidPhone(phone) {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
}

// Format phone number
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
}

// Form handlers
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    
    // Login form
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor, insira um email válido!');
            return;
        }
        
        // Find user
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = user;
            alert(`Bem-vindo(a), ${user.name}!`);
            closeModal('loginModal');
            updateAuthButtons();
            
            // Reset form
            document.getElementById('loginForm').reset();
        } else {
            alert('Email ou senha incorretos!');
        }
    });

    // Register form - Enhanced with farmer page functionality
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const phone = document.getElementById('registerPhone').value.trim();
        const password = document.getElementById('registerPassword').value;
        const userType = document.getElementById('userType').value;
        const farmName = document.getElementById('farmName').value.trim();
        const farmAddress = document.getElementById('farmAddress').value.trim();
        
        // Get selected categories
        const categoryCheckboxes = document.querySelectorAll('input[name="farmerCategories"]:checked');
        const farmerCategories = Array.from(categoryCheckboxes).map(cb => cb.value);
        
        // Validation
        if (!name || !email || !phone || !password || !userType) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor, insira um email válido!');
            return;
        }
        
        if (password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres!');
            return;
        }
        
        // Check if email already exists
        if (users.find(u => u.email === email)) {
            alert('Este email já está cadastrado!');
            return;
        }
        
        if (userType === 'vendedor') {
            if (!farmName) {
                alert('Nome da propriedade é obrigatório para vendedores!');
                return;
            }
            if (farmerCategories.length === 0) {
                alert('Selecione pelo menos uma categoria de produtos!');
                return;
            }
        }
        
        const userData = {
            id: users.length + 1,
            name: name,
            email: email,
            phone: formatPhone(phone),
            password: password,
            type: userType
        };
        
        if (userType === 'vendedor') {
            userData.farmName = farmName;
            userData.farmAddress = farmAddress;
            userData.categories = farmerCategories;
            
            // Handle farmer page
            const farmerPage = document.getElementById('farmerPage')?.value.trim();
            if (farmerPage) {
                // Valida o nome da página
                if (!/^[a-z0-9-]+$/i.test(farmerPage)) {
                    alert('O nome da página deve conter apenas letras, números e hífens!');
                    return;
                }
                
                // Check if page name already exists
                if (users.find(u => u.farmerPage && u.farmerPage.toLowerCase() === farmerPage.toLowerCase())) {
                    alert('Este nome de página já está em uso!');
                    return;
                }
                
                userData.farmerPage = farmerPage.toLowerCase();
            }
        }
        
        users.push(userData);
        
        // In a real environment, save to localStorage:
        // localStorage.setItem('agroUsers', JSON.stringify(users));
        
        alert('Cadastro realizado com sucesso!');
        closeModal('registerModal');
        updateAuthButtons();
        document.getElementById('registerForm').reset();
    });

    // Add product form - Enhanced with localStorage save
    document.getElementById('addProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!currentUser || currentUser.type !== 'vendedor') {
            alert('Apenas vendedores podem adicionar produtos!');
            return;
        }
        
        const productName = document.getElementById('productName').value.trim();
        const productCategory = document.getElementById('productCategory').value;
        const productPrice = parseFloat(document.getElementById('productPrice').value);
        const productUnit = document.getElementById('productUnit').value;
        const productDescription = document.getElementById('productDescription').value.trim();
        
        // Validation
        if (!productName || !productCategory || isNaN(productPrice) || !productUnit) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }
        
        // Check if category is allowed for this farmer
        if (currentUser.categories && !currentUser.categories.includes(productCategory)) {
            alert('Você não está cadastrado para vender produtos desta categoria!');
            return;
        }
        
        const newProduct = {
            id: products.length + 1,
            name: productName,
            category: productCategory,
            price: productPrice,
            unit: productUnit,
            description: productDescription,
            farmer: {
                name: currentUser.name,
                phone: currentUser.phone,
                farm: currentUser.farmName
            }
        };
        
        products.push(newProduct);
        
        // In a real environment, save to localStorage:
        // localStorage.setItem('agroProducts', JSON.stringify(products));
        
        alert('Produto adicionado com sucesso!');
        closeModal('addProductModal');
        displayProducts();
        document.getElementById('addProductForm').reset();
    });
});