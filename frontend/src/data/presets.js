export const LEGACY_PRESETS = [
  {
    id: "jquery-ajax",
    title: "jQuery AJAX & DOM",
    icon: "file-code",
    description: "Legacy $.ajax call, success/error callbacks, and manual jQuery DOM manipulation.",
    code: `// Legacy jQuery AJAX and DOM update
function loadUserData(userId) {
    $('#loading').show();
    var self = this;
    
    $.ajax({
        url: '/api/users/' + userId,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            $('#loading').hide();
            if (response != null && response.status == 'success') {
                var user = response.data;
                var html = '<div class="user-card">' +
                    '<h3>' + user.name + '</h3>' +
                    '<p>Email: ' + user.email + '</p>' +
                    '</div>';
                $('#user-container').html(html);
            } else {
                alert('Error loading user');
            }
        },
        error: function(xhr, status, error) {
            $('#loading').hide();
            console.log('AJAX Error: ' + error);
            alert('Failed to connect to server');
        }
    });
}`,
    modernizedCode: `// Modernized: Fetch API + Async/Await + Template Literals
async function loadUserData(userId) {
    const loading = document.getElementById('loading');
    const userContainer = document.getElementById('user-container');
    loading.style.display = 'block';

    try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const result = await response.json();

        if (result.status === 'success') {
            const { name, email } = result.data;
            const html = \`
                <div class="user-card">
                    <h3>\${name}</h3>
                    <p>Email: \${email}</p>
                </div>
            \`;
            userContainer.innerHTML = html;
        } else {
            alert('Error loading user');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to connect to server');
    } finally {
        loading.style.display = 'none';
    }
}`,
    explanation: "The legacy code used jQuery AJAX and callbacks. It has been modernized using the Fetch API with async/await, template literals for cleaner string handling, and destructuring for better readability.",
    keyImprovements: [
      "Replaced jQuery AJAX with Fetch API",
      "Used async/await for better flow",
      "Template literals for HTML",
      "Modern DOM API usage",
      "Better error handling structure"
    ]
  },
  {
    id: "es5-class-prototype",
    title: "ES5 Class & Prototype",
    icon: "layers",
    description: "ES5 function constructor, prototype methods, and manual context binding.",
    code: `// Legacy ES5 Function Constructor & Prototype Methods
function UserAccount(name, email, role) {
    this.name = name;
    this.email = email;
    this.role = role || 'member';
    this.loginCount = 0;
}

UserAccount.prototype.login = function() {
    this.loginCount++;
    var self = this;
    setTimeout(function() {
        console.log(self.name + ' logged in. Total: ' + self.loginCount);
    }, 100);
};

UserAccount.prototype.getDetails = function() {
    return this.name + ' (' + this.email + ') - ' + this.role.toUpperCase();
};`,
    modernizedCode: `// Modernized: ES6 Class Syntax + Arrow Functions + Default Params
class UserAccount {
    constructor(name, email, role = 'member') {
        this.name = name;
        this.email = email;
        this.role = role;
        this.loginCount = 0;
    }

    login() {
        this.loginCount++;
        setTimeout(() => {
            console.log(\`\${this.name} logged in. Total: \${this.loginCount}\`);
        }, 100);
    }

    getDetails() {
        return \`\${this.name} (\${this.email}) - \${this.role.toUpperCase()}\`;
    }
}`,
    explanation: "Replaced function prototype pattern with standard ES6 class syntax, eliminating manual 'var self = this' closure hacks with lexical arrow functions and modern template literals.",
    keyImprovements: [
      "Converted prototype methods to ES6 class",
      "Used default parameter values",
      "Arrow functions for lexical 'this' binding",
      "Template literals for string formatting",
      "Cleaner, OOP-standard code structure"
    ]
  },
  {
    id: "callback-hell",
    title: "Callback Hell",
    icon: "git-merge",
    description: "Deeply nested asynchronous callbacks with error-first patterns.",
    code: `// Legacy Deeply Nested Callback Pyramid
function processUserOrder(userId, callback) {
    getUser(userId, function(err, user) {
        if (err) return callback(err);
        getCart(user.cartId, function(err, cart) {
            if (err) return callback(err);
            calculateDiscounts(cart, function(err, total) {
                if (err) return callback(err);
                chargePayment(user.id, total, function(err, receipt) {
                    if (err) return callback(err);
                    sendConfirmationEmail(user.email, receipt, function(err) {
                        if (err) return callback(err);
                        callback(null, receipt);
                    });
                });
            });
        });
    });
}`,
    modernizedCode: `// Modernized: Flat Async/Await Flow with Structured Error Handling
async function processUserOrder(userId) {
    try {
        const user = await getUser(userId);
        const cart = await getCart(user.cartId);
        const total = await calculateDiscounts(cart);
        const receipt = await chargePayment(user.id, total);
        
        await sendConfirmationEmail(user.email, receipt);
        return receipt;
    } catch (error) {
        console.error('Order processing failed:', error);
        throw error;
    }
}`,
    explanation: "Converted the pyramid of doom into a flat, readable async/await flow with a single centralized try/catch block.",
    keyImprovements: [
      "Eliminated callback nesting pyramid",
      "Native Promise & async/await adoption",
      "Centralized error handling with try/catch",
      "Significantly improved code maintainability",
      "Reduced cognitive load and potential leakages"
    ]
  },
  {
    id: "legacy-var-scope",
    title: "Legacy Var & Scope",
    icon: "zap",
    description: "Function-scoped var declarations, hoisting issues, and loop closures.",
    code: `// Legacy var declaration hoisting & loop closure bug
function createButtonHandlers(buttons) {
    var handlers = [];
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        (function(index, btn) {
            handlers.push(function() {
                var message = 'Clicked button #' + (index + 1) + ': ' + btn.title;
                alert(message);
            });
        })(i, button);
    }
    return handlers;
}`,
    modernizedCode: `// Modernized: Block-scoped let/const + Array.map
function createButtonHandlers(buttons) {
    return buttons.map((button, index) => () => {
        const message = \`Clicked button #\${index + 1}: \${button.title}\`;
        alert(message);
    });
}`,
    explanation: "Replaced IIFE closure workarounds and 'var' hoisting problems with block-scoped 'const' and modern functional array transformations.",
    keyImprovements: [
      "Replaced 'var' with block-scoped 'const' & 'let'",
      "Eliminated IIFE closure hack wrapper",
      "Used clean Array.prototype.map syntax",
      "Template literals for message generation",
      "Zero hoisting risk and cleaner footprint"
    ]
  },
  {
    id: "loose-equality",
    title: "Loose Equality",
    icon: "scale",
    description: "Type coercion pitfalls with == and != operators and manual falsy checks.",
    code: `// Legacy loose comparisons and manual type coercions
function validateConfig(config) {
    if (config.port == null || config.port == 0) {
        config.port = 3000;
    }
    if (config.debug == "true" || config.debug == 1) {
        config.debug = true;
    } else if (config.debug == "false" || config.debug == 0) {
        config.debug = false;
    }
    var isSecure = config.protocol == "https";
    return {
        port: Number(config.port),
        debug: Boolean(config.debug),
        isSecure: isSecure
    };
}`,
    modernizedCode: `// Modernized: Strict Equality (===) + Nullish Coalescing (??)
function validateConfig(config = {}) {
    const port = config.port ?? 3000;
    const debug = config.debug === true || config.debug === 'true' || config.debug === 1;
    const isSecure = config.protocol === 'https';

    return {
        port: Number(port),
        debug,
        isSecure
    };
}`,
    explanation: "Replaced loose equality checks (==) with strict equality (===) and utilized nullish coalescing (??) operator for reliable default values.",
    keyImprovements: [
      "Strict equality (===) across all comparisons",
      "Nullish coalescing (??) for sensible defaults",
      "Object shorthand property notation",
      "Safer type handling without coercion bugs",
      "Modern default function parameters"
    ]
  },
  {
    id: "dom-manipulation",
    title: "DOM Manipulation",
    icon: "code",
    description: "Old document.createElement chains and cumbersome event listener attachments.",
    code: `// Legacy createElement & manual event listener attachment
function renderUserList(container, users) {
    container.innerHTML = '';
    var ul = document.createElement('ul');
    ul.className = 'user-list';

    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var li = document.createElement('li');
        var nameSpan = document.createElement('span');
        nameSpan.innerText = user.name;
        var btn = document.createElement('button');
        btn.innerText = 'Delete';
        
        btn.onclick = (function(u) {
            return function() {
                deleteUser(u.id);
            };
        })(user);

        li.appendChild(nameSpan);
        li.appendChild(btn);
        ul.appendChild(li);
    }
    container.appendChild(ul);
}`,
    modernizedCode: `// Modernized: DocumentFragment / Template literals + Event Delegation
function renderUserList(container, users) {
    const listItems = users.map(({ id, name }) => \`
        <li class="user-item" data-id="\${id}">
            <span>\${name}</span>
            <button type="button" class="btn-delete" data-action="delete">Delete</button>
        </li>
    \`).join('');

    container.innerHTML = \`<ul class="user-list">\${listItems}</ul>\`;

    container.querySelector('.user-list')?.addEventListener('click', (event) => {
        const target = event.target;
        if (target.dataset.action === 'delete') {
            const userId = target.closest('[data-id]')?.dataset.id;
            if (userId) deleteUser(userId);
        }
    });
}`,
    explanation: "Replaced repetitive DOM createElement and attachment cascades with template literals and efficient event delegation.",
    keyImprovements: [
      "Modern template string HTML generation",
      "Event delegation instead of per-item closures",
      "Destructuring for cleaner object parameters",
      "Optional chaining (?.) for safe access",
      "Higher rendering performance"
    ]
  }
];
