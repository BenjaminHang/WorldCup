let cards = [
  {
    "className": "card-left",
    "title": "A-B组",
    "icons": [
      "../../images/egyf.png", "../../images/uruf.png",
      "../../images/ksaf.png", "../../images/rusf.png",
      "../../images/egye.png", "../../images/urue.png",
      "../../images/ksae.png", "../../images/ruse.png",
      "../../images/espf.png", "../../images/marf.png",
      "../../images/porf.png", "../../images/irnf.png",
      "../../images/espe.png", "../../images/mare.png",
      "../../images/pore.png", "../../images/irne.png",
    ],
  },
  {
    "className": "card",
    "title": "C-D组",
    "icons": [
      "../../images/ausf.png", "../../images/fraf.png",
      "../../images/denf.png", "../../images/perf.png",
      "../../images/ause.png", "../../images/frae.png",
      "../../images/dene.png", "../../images/pere.png",
      "../../images/islf.png", "../../images/argf.png",
      "../../images/crof.png", "../../images/ngrf.png",
      "../../images/isle.png", "../../images/arge.png",
      "../../images/croe.png", "../../images/ngre.png",
    ],
  },
  {
    "className": "card-right",
    "title": "E-F组",
    "icons": [
      "../../images/srbf.png", "../../images/braf.png",
      "../../images/suif.png", "../../images/crcf.png",
      "../../images/srbe.png", "../../images/brae.png",
      "../../images/suie.png", "../../images/crce.png",
      "../../images/korf.png", "../../images/gerf.png",
      "../../images/swef.png", "../../images/mexf.png",
      "../../images/kore.png", "../../images/gere.png",
      "../../images/swee.png", "../../images/mexe.png",
    ],
  },
  {
    "className": "card-righthidden",
    "title": "G-H组",
    "icons": [
      "../../images/belf.png", "../../images/engf.png",
      "../../images/panf.png", "../../images/tunf.png",
      "../../images/bele.png", "../../images/enge.png",
      "../../images/pane.png", "../../images/tune.png",
      "../../images/senf.png", "../../images/polf.png",
      "../../images/colf.png", "../../images/jpnf.png",
      "../../images/sene.png", "../../images/pole.png",
      "../../images/cole.png", "../../images/jpne.png",
    ],
  },
]

let matches = {
  "id": 0,
  "name": ["俄罗斯", "沙特"],
  "time": { "day": "6-14", "hour": "23:00" },
  "score": [],
  "group": "A",
  "mostPopularPrediction": [2, 0],
  "isEnd": false
}

let userPrediction = {
  userId: '',
  userName: '笑点在哪里',
  predictionCounts: 0,
  correctScoreCounts: 0,
  correctVictoryCounts: 0,
  beatUsers: '100%',
  matches: [
    {
      "id": 0,
      "name": ["俄罗斯", "沙特"],
      "time": { "day": "6-14", "hour": "23:00" },
      "score": [],
      "haveDone": 1,
      "group": "A",
      "mostPopularPrediction": [2, 0],
      "userPrediction": [2, 0]
    },
    {
      "id": 1,
      "name": ["埃及", "哥斯达黎加"],
      "time": { "day": "6-15", "hour": "20:00" },
      "score": [1, 2],
      "haveDone": 2,
      "group": "A",
      "mostPopularPrediction": [1, 2],
      "userPrediction": []
    },
    {
      "id": 2,
      "name": ["摩洛哥", "伊朗"],
      "time": { "day": "6-15", "hour": "23:00" },
      "score": [],
      "haveDone": 0,
      "group": "A",
      "mostPopularPrediction": [2, 0],
      "userPrediction": []
    }
  ]
}
let flags = {
  "埃及": "egy",
  "乌拉圭": "uru",
  "沙特": "ksa",
  "俄罗斯": "rus",
  "西班牙": "esp",
  "摩洛哥": "mar",
  "葡萄牙": "por",
  "伊朗": "irn",
  "澳大利亚": "aus",
  "法国": "fra",
  "丹麦": "den",
  "秘鲁": "per",
  "冰岛": "isl",
  "阿根廷": "arg",
  "克罗地亚": "cro",
  "尼日利亚": "ngr",
  "塞尔维亚": "srb",
  "巴西": "bra",
  "瑞士": "sui",
  "哥斯达黎加": "crc",
  "韩国": "kor",
  "德国": "ger",
  "瑞典": "swe",
  "墨西哥": "mex",
  "比利时": "bel",
  "英格兰": "eng",
  "巴拿马": "pan",
  "突尼斯": "tun",
  "塞内加尔": "sen",
  "波兰": "pol",
  "哥伦比亚": "col",
  "日本": "jpn"
}

module.exports = {
  cards: cards,
  matches: matches,
  userPrediction: userPrediction,
  flags: flags
}