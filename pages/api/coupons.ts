import fetch from 'node-fetch'
import uniqBy from 'lodash/uniqBy'

const URL = 'https://gift.kakao.com/a/v1/search/query?'
const DEFAULT_QUERIES = {
  query: '스타벅스',
  searchType: 'typing_keyword',
  includeType: 'product',
}

interface Data {
  products: {
    contents: []
    last: boolean
  }
}

export default async function handler(req, res) {
  let data = []
  let page = 0
  while (true) {
    const targetParams = new URLSearchParams({
      ...DEFAULT_QUERIES,
      page: `${page++}`,
    })

    const fetchRes = await fetch(URL + targetParams)
    const json = (await fetchRes.json()) as Data

    data = [...data, ...json.products.contents]

    if (json.products.last) {
      break
    }
  }

  data = uniqBy(data, 'displayName')

  res.status(200).json({ data })
}
