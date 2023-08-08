document.addEventListener('DOMContentLoaded', function() {
    let repoId = '';
    let form = document.getElementById('github-form');
    let name = '';

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let search = document.getElementById('search').value;
        
        let originalName = search.split(' ').join('');

        document.getElementById('user-list').innerHTML = '';
        document.getElementById('repos-list').innerHTML = '';

        fetch(`https://api.github.com/users/${originalName}`)
        .then(resp => resp.json())
        .then((data) => {
            document.getElementById('user-list').innerHTML = `
            <li id="${data.id}">Username: ${data.login}</li>
            <img src ='${data.avatar_url}'/>
            <li>${data.html_url}</li>
            `;

            repoId = data.id;
            name = data.login;

            let getRepo = document.getElementById(`${repoId}`);
            
            getRepo.addEventListener('click', () => {
                fetch(`https://api.github.com/users/${name}/repos`)
                .then(resp => resp.json())
                .then((data) => {
                    data.forEach(repo => {
                        document.getElementById('repos-list').innerHTML += `<li>${repo.name}</li>`;
                    });
                });
            });
        });
    });
});
