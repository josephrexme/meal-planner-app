(function (){
  const $ = document.getElementById.bind(document);
  const container = $('container');
  const createForm = $('createForm');
  const name = $('name');
  const category = $('category');
  const recipeLink = $('recipe');
  const cookDate = $('cookdate');
  const imageLink = $('image');
  const searchForm = $('searchForm');
  const searchInput = $('searchInput');
  const clearBtn = $('clearBtn');
  const apiKey = 'keyvl1JG8vw4QrqYN';
  let items = [];

  axios.defaults.baseURL = 'https://api.airtable.com/v0/app0FoyfwLv2apBGd/';
  axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  const populate = () => {
    axios.get('/planner').then((response) => {
      const data = response.data.records;
      items = data.map(item => item.fields);
      render(container, items);
    });
  };

  // Loading Initial Data
  populate();

  // Adding New Plan
  createForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newEntry = {
      name: name.value,
      category: [category.value],
      image_link: imageLink.value,
      recipe_link: recipeLink.value,
      cook_date: cookDate.value
    };
    axios.post('/planner', {
      fields: newEntry
    }).then(() => {
      items.unshift(newEntry);
      render(container, items);
      name.value = '';
      category.value = '';
      imageLink.value = '';
      recipeLink.value = '';
      cookDate.value = '';
    });
  });

  // Search Meals
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Perform a regex match by creating a regular expression
    // through user input. gi means global and case insensitive
    const regExp = new RegExp(searchInput.value, 'gi');
    // .match takes a regex and returns an array of matched values
    // it returns null for unmatched values so we use !! to convert
    // whatever it returns into a boolean. The filter returns only
    // items that have matching characters to what is searched.
    items = items.filter(item => !!item.name.match(regExp));
    render(container, items);
  });

  clearBtn.addEventListener('click', populate);

  // DOM render function
  function render(wrapper, content) {
    const opt = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const htmlList = content.map(item => (`
      <li>
        <span>${item.category[0]}</span>
        <img src="${item.image_link}" />
        <div>
          <h3>${item.name}</h3>
          <a href="${item.recipe_link}">view recipe</a>
          <h5>${(new Date(item.cook_date).toLocaleDateString('en', opt))}</h5>
        </div>
      </li>
    `));
    wrapper.innerHTML = htmlList.join('');
  }
}());