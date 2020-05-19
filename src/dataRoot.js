export default { 
  // Setting proxy
  proxy: 'https://cors-anywhere.herokuapp.com/',
  // proxy: 'https://api.codetabs.com/v1/proxy?quest=',
  site: 'saturn.net',

  news: [],
  comparedNews: [],
  regionNews: [],
  
  regionsChanged: true,
  activeRegions: [],

  regions: [
    {
      id: 'spb', 
      name: 'Санкт-Петербург',
      active: true
    },
    {
      id: 'msk', 
      name: 'Москва',
      active: true
    },
    {
      id: 'bar', 
      name: 'Барнаул',
      active: true
    },
    {
      id: 'vlg', 
      name: 'Волгоград',
      active: true
    },
    {
      id: 'ekb', 
      name: 'Екатеринбург',
      active: true
    },
    {
      id: 'kaz', 
      name: 'Казань',
      active: true
    },
    {
      id: 'krd', 
      name: 'Краснодар',
      active: true
    },
    {
      id: 'kras', 
      name: 'Красноярск',
      active: true
    },
    {
      id: 'mag', 
      name: 'Магнитогорск',
      active: true
    },
    {
      id: 'nnv', 
      name: 'Нижний-Новгород',
      active: true
    },
    {
      id: 'ore', 
      name: 'Оренбург',
      active: true
    },
    {
      id: 'nsk', 
      name: 'Новосибирск',
      active: true
    },
    {
      id: 'sam', 
      name: 'Самара',
      active: true
    },
    {
      id: 'sochi', 
      name: 'Сочи',
      active: true
    },
    {
      id: 'ufa', 
      name: 'Уфа',
      active: true
    },
    {
      id: 'chel', 
      name: 'Челябинск',
      active: true
    },
    {
      id: 'pd', 
      name: 'Подольск',
      active: true
    },
    {
      id: 'slv', 
      name: 'Салават',
      active: true
    },
    {
      id: 'str', 
      name: 'Стерлитамак',
      active: true
    },
    {
      id: 'nft', 
      name: 'Нефтекамск',
      active: true
    },
    {
      id: 'oz', 
      name: 'Орехово-Зуево',
      active: true
    },
    {
      id: 'vlz', 
      name: 'Волжский',
      active: true
    },
    {
      id: 'tlt', 
      name: 'Тольятти',
      active: true
    },
    {
      id: 'tomsk',
      name: 'Томск',
      active: true
    }
  ]
}