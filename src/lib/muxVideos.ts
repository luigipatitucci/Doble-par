export const muxVideos = {
  monCheri: "HthuHN8yn5LYcq1TRMx957J00PDJd9tg01mH2tmbl026lI",
  frizze1: "EvXCPX019AGpgAgfpQMDgro0200DdUqgRwH2PHGRwma10000",
  frizze2: "ONT6h7Ybaaxfna8zK8xow5vuFOpIO02gL4LMCEoRVf4w",
  kia: "7x7e8ui46k2uspI5kIFfVBySVH6IsXYkYEKowH00XD100",
  adn: "01hzumaKVjdcgO00LANvKsYLbKm01aCZZAMIdMWjG6029DI",
  frizze3: "Pwkc85bfXSc2tTTRou8ZZynoGa6Pv2CWlkFJ2DfUxZM",
  crunch: "NOa734wsCrr015mzYqrdGu2ZCmotHSzMozZbi4nlqd2U",
  frizze4: "Y2ufWmJg7mC3Oie201yajB01wkxdwI4h6k3alyj4Vk00as",
  sur: "RVyz28xBS5gnLeSh5D3pKxeBHQyShrRI7WlNfymz3P4",
  go: "DaLO9S4F01oKII1T8PBsyuDpEoxYq02S2oDqQR01fgn2l8",
  mundial: "idTxslH4zk35Hyl022uqFStoWRgVpyQHMlsh1gtkDoDc",
  ugc: "bdksLCOEiQpCCjIDSdP02Ma34as6N02hsWeoCsYgWXnZI",
  gravity: "sECHGEapCjw021VsTVZYug02sN4MYe02UYJ4dPYv89W2Mg",
  sour: "VqVA9yNzB02KbTLX6MAUq01n2Prpm00L7XacSq8YFxWAvg",
};

export const getMuxVideo = (id: string) => ({
  video: `https://stream.mux.com/${id}.m3u8`,
  poster: `https://image.mux.com/${id}/thumbnail.jpg?time=0.1`,
});