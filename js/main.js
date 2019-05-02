(function (){
  const container = document.getElementById('container');
  const apiKey = 'keyvl1JG8vw4QrqYN';
  axios.defaults.baseURL = 'https://api.airtable.com/v0/app0FoyfwLv2apBGd/';
  axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
  axios.get('/planner').then((response) => {
    const data = response.data.records;
    const items = data.map(node => {
      const { fields } = node;
      return `
      <li>
        <span>${fields.category[0]}</span>
        <img src="${fields.image_link}" />
        <div>
          <h3>${fields.name}</h3>
          <a href="${fields.recipe_link}">view recipe</a>
          <h5>${fields.cook_date}</h5>
        </div>
      </li>
      `;
    });
    render(container, items.join(''));
  });

  function render(wrapper, content) {
    wrapper.innerHTML = content;
  }
}());