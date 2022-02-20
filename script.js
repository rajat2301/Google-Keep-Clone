const updateData= () => {
    const textData = document.querySelectorAll('textarea');
    const noteData = [];
    textData.forEach((note)=>{
        return noteData.push(note.value)
    })
    localStorage.setItem('noteData',JSON.stringify(noteData));
}

const addNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');    
    const htmlData = `
        <div class="operation outer">
        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="main ${text ? '' : 'hidden'}"></div>
        <textarea class="${text ? 'hidden' : ''}"></textarea>
            `;
    note.insertAdjacentHTML('afterbegin',htmlData);

    const editBtn = note.querySelector('.edit');
    const delBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    delBtn.addEventListener('click',()=>{
        note.remove();
        updateData();
    })

    textarea.value = text;
    main.innerHTML = text;

    editBtn.addEventListener('click',()=>{
        main.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })

    textarea.addEventListener('change',(event)=>{
        const value = event.target.value;
        main.innerHTML=value;
        updateData();
    })

    document.body.appendChild(note);
}

const getData = () => {
    const noteData = JSON.parse(localStorage.getItem('noteData'));

    if(noteData){
        noteData.forEach((note)=>{
            addNote(note);
        })
    }
}

getData();

const add = document.querySelector('.add-Btn');
add.addEventListener('click',()=>addNote());