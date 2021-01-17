import axios from 'axios';
import cheerio from 'cheerio';

// todo: get list of comittee codes
// Code=AG00

// todo: find RSS feed for each comimtte
// https://docs.house.gov/Committee/RSS.ashx?Code=AG00

// todo: scrape for each item in feed
const scrape = () =>
  axios
    .get(
      'https://docs.house.gov/Committee/Calendar/ByEvent.aspx?EventID=111074'
    )
    .then((resp) => {
      console.log(resp.status);
      const $ = cheerio.load(resp.data);

      const hearing = $('#previewPanel').find('h1').text();
      console.log(hearing);

      const witnesses = [];

      $('#previewPanel')
        .find($('.witnessPanel'))
        .each(function (i, e) {
          const blurb = $(this).text();
          const important = blurb
            .substring(5)
            .slice(0, blurb.substring(5).search('\\n'));
          witnesses.push(important);
        });

      console.log(witnesses);
    });

scrape();
