let posts = [];

const postTitleInputNode = document.querySelector(".js-post-title-input");
const postTextInputNode = document.querySelector(".js-post-text-input");
const newPostBtnNode = document.querySelector(".js-new-post-btn");
const postsNode = document.querySelector('.js-posts');
// const titleValidationMessage = document.querySelector('.validationMessageTitle');
const textValidationMessage = document.querySelector('.validationMessageText');

newPostBtnNode.addEventListener("click", function () {

    // получить данные из поля ввода
    const postFromUser = getPostFromUser()

    // сохранить пост
    addPost(postFromUser)

    // отобразить пост
    renderPosts()
    // очистка инпутов после публикации поста
    cleaningInputs()
    newPostBtnNode.disabled = true;
});



function cleaningInputs() {
    postTitleInputNode.value = '';
    postTextInputNode.value = '';
}

postTitleInputNode.addEventListener('input', function () {
    validation()
})
postTextInputNode.addEventListener('input', function () {
    validation()
})

function validation() {
    const titleLength = postTitleInputNode.value.length
    const textLength = postTextInputNode.value.length

    if (titleLength >= 1 && textLength >= 1) {
        newPostBtnNode.disabled = false;
    }

    if (titleLength > 10) {
        newPostBtnNode.disabled = true;
        textValidationMessage.innerText = `Длина заголовка не более 10 символов`;
        textValidationMessage.classList.remove('validationMessage_hidden')
        return
    }
    
    if (textLength > 100) {
        newPostBtnNode.disabled = true;
        textValidationMessage.innerText = `Длина текста не более 100 символов`;
        textValidationMessage.classList.remove('validationMessage_hidden')
        return
    }
        textValidationMessage.classList.add('validationMessage_hidden')
}

function getPostFromUser() {
    const title = postTitleInputNode.value;
    const text = postTextInputNode.value;
    return {
        title: title,
        text: text,
    }
}

function dateCreatePostFn() {
    let data = new Date()
    let day = data.getDate().toString().padStart(2, '0');
    let month = (data.getMonth() + 1).toString().padStart(2, '0');
    let year = data.getFullYear()
    let hours = data.getHours().toString().padStart(2, '0');
    let min = data.getMinutes().toString().padStart(2, '0');
    let formattedDateTime = `${day}.${month}.${year}  ${hours}:${min}`
    return formattedDateTime
}
 

function addPost({title, text}) {
    const currentDate = dateCreatePostFn()
    posts.push({
        currentDate,
        title,
        text,
    })
}

function getPosts() {
    return posts
}



function renderPosts() {
    const posts = getPosts()    // ?

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML += `
        <div class="post">
            <p class='post__date'>${post.currentDate}</p>
            <p class='post__title'>${post.title}</p>
            <p class='post__text'>${post.text}</p>
        </div>
        `;
    });

    postsNode.innerHTML = postsHTML
}

