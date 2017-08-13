import axios from 'axios';

const baseUrl = 'http://[2601:281:8000:caa0:8817:f610:abcf:9c69]:2403/';

const api = {
  eatns: () => fetch(`${baseUrl}eatns`).then((r) => r.json()),
};

export default api