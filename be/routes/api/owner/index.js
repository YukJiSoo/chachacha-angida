var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  const menu_lists = [
            {
              avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
              title: 'Brunch this weekend?',
              subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
              cost: '10000'
            },
            {
              avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
              title: 'Summer BBQ <span class="grey--text text--lighten-1"></span>',
              subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
              cost: '11000'
            },
            {
              avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
              title: 'Oui oui',
              subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
              cost: '12000'
            }
          ]
  res.send({menu_list: menu_lists});
});

router.get('/reviewmanage/:id', function(req, res, next) {
  const id = req.params.id
  const review_lists = [
            {
              ID: '차민형',
              title: '맛있다',
              subtitle: "맛있다"
            },
            {
              ID: '박준서',
              title: '맛없다',
              subtitle: "맛없다"
            },
            {
              ID: '육지수',
              title: '걍그럼',
              subtitle: "걍그럼"
            }
          ]
  res.send({review_list: review_lists});
});

router.get('/salemanage/:id', function(req, res, next) {
  const id = req.params.id
  const sale_lists = [
      {
        title: '주문자1',
        cost: '10000',
        items: [

          { menu: '음식1, 음식2, 음식3' },
          { time: '오전 1시 10분' }
        ]
      },
      {
        title: '주문자2',
        cost: '10000',
        items: [

          { menu: '음식1, 음식2, 음식3' },
          { time: '오전 1시 10분' }
        ]
      },{
        title: '주문자3',
        cost: '10000',
        items: [

          { menu: '음식1, 음식2, 음식3' },
          { time: '오전 1시 10분' }
        ]
      },{
        title: '주문자4',
        cost: '10000',
        items: [

          { menu: '음식1, 음식2, 음식3' },
          { time: '오전 1시 10분' }
        ]
      }
    ]
  res.send({sale_list: sale_lists});
});


router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않음'));
});

module.exports = router;
