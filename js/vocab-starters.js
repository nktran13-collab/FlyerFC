/* Cambridge English: Pre A1 Starters vocabulary */
window.VOCAB = window.VOCAB || {};
(function () {
  const W = (en, vi, emoji, ex) => ({ en, vi, emoji, ex });

  window.VOCAB.starters = {
    meta: {
      id: 'starters',
      name: 'Starters',
      vi: 'Pre A1',
      emoji: '🐣',
      tagline: 'Bắt đầu thật vui',
      mascot: '🐣'
    },
    topics: [
      {
        id: 'animals',
        name: 'Animals',
        vi: 'Động vật',
        icon: '🐾',
        tone: 1,
        words: [
          W('cat', 'con mèo', '🐱', 'The cat is sleeping on the mat.'),
          W('dog', 'con chó', '🐶', 'My dog likes to run in the park.'),
          W('fish', 'con cá', '🐟', 'This fish is orange and small.'),
          W('bird', 'con chim', '🐦', 'A bird is singing in the tree.'),
          W('rabbit', 'con thỏ', '🐰', 'The rabbit has long ears.'),
          W('horse', 'con ngựa', '🐴', 'The horse can run very fast.'),
          W('cow', 'con bò', '🐮', 'The cow is eating grass.'),
          W('sheep', 'con cừu', '🐑', 'The sheep is white and soft.'),
          W('duck', 'con vịt', '🦆', 'The duck is swimming in the water.'),
          W('frog', 'con ếch', '🐸', 'A frog can jump very high.'),
          W('monkey', 'con khỉ', '🐵', 'The monkey is climbing the tree.'),
          W('elephant', 'con voi', '🐘', 'The elephant has a big nose.'),
          W('tiger', 'con hổ', '🐯', 'The tiger has orange fur.'),
          W('snake', 'con rắn', '🐍', 'The snake is long and green.'),
          W('mouse', 'con chuột', '🐭', 'The mouse is very small.'),
          W('bear', 'con gấu', '🐻', 'The bear likes to eat honey.')
        ]
      },
      {
        id: 'colours',
        name: 'Colours & Shapes',
        vi: 'Màu sắc & Hình khối',
        icon: '🎨',
        tone: 2,
        words: [
          W('red', 'màu đỏ', '🔴', 'The apple is red.'),
          W('blue', 'màu xanh dương', '🔵', 'The sky is blue today.'),
          W('green', 'màu xanh lá', '🟢', 'The grass is green.'),
          W('yellow', 'màu vàng', '🟡', 'The sun is yellow.'),
          W('orange', 'màu cam', '🟠', 'My bag is orange.'),
          W('purple', 'màu tím', '🟣', 'She has a purple hat.'),
          W('pink', 'màu hồng', '🌸', 'The flower is pink.'),
          W('brown', 'màu nâu', '🟤', 'The bear is brown.'),
          W('black', 'màu đen', '⚫', 'The cat is black.'),
          W('white', 'màu trắng', '⚪', 'The cloud is white.'),
          W('circle', 'hình tròn', '⭕', 'A ball is a circle.'),
          W('square', 'hình vuông', '🟦', 'The window is a square.'),
          W('triangle', 'hình tam giác', '🔺', 'This pizza is a triangle.'),
          W('star', 'ngôi sao', '⭐', 'I can see a star in the sky.'),
          W('heart', 'trái tim', '💗', 'She draws a pink heart.')
        ]
      },
      {
        id: 'food',
        name: 'Food & Drink',
        vi: 'Đồ ăn & Thức uống',
        icon: '🍎',
        tone: 3,
        words: [
          W('apple', 'quả táo', '🍎', 'I eat an apple every day.'),
          W('banana', 'quả chuối', '🍌', 'Monkeys love bananas.'),
          W('orange', 'quả cam', '🍊', 'This orange is very sweet.'),
          W('bread', 'bánh mì', '🍞', 'I have bread for breakfast.'),
          W('milk', 'sữa', '🥛', 'I drink milk in the morning.'),
          W('water', 'nước', '💧', 'Please give me some water.'),
          W('juice', 'nước ép', '🧃', 'She likes apple juice.'),
          W('egg', 'quả trứng', '🥚', 'I eat one egg for breakfast.'),
          W('cake', 'bánh ngọt', '🍰', 'We have cake on my birthday.'),
          W('rice', 'cơm', '🍚', 'We eat rice with fish.'),
          W('cheese', 'phô mai', '🧀', 'The mouse eats cheese.'),
          W('chicken', 'thịt gà', '🍗', 'I like chicken and rice.'),
          W('ice cream', 'kem', '🍦', 'Ice cream is cold and sweet.'),
          W('chocolate', 'sô-cô-la', '🍫', 'This chocolate is very good.'),
          W('soup', 'súp', '🥣', 'Hot soup is good in winter.'),
          W('grapes', 'chùm nho', '🍇', 'These grapes are purple.')
        ]
      },
      {
        id: 'family',
        name: 'Family & Body',
        vi: 'Gia đình & Cơ thể',
        icon: '👪',
        tone: 4,
        words: [
          W('mother', 'mẹ', '👩', 'My mother cooks great food.'),
          W('father', 'bố', '👨', 'My father drives me to school.'),
          W('sister', 'chị/em gái', '👧', 'My sister is five years old.'),
          W('brother', 'anh/em trai', '👦', 'My brother plays football.'),
          W('baby', 'em bé', '👶', 'The baby is sleeping now.'),
          W('grandmother', 'bà', '👵', 'My grandmother tells nice stories.'),
          W('grandfather', 'ông', '👴', 'My grandfather likes to walk.'),
          W('family', 'gia đình', '👨‍👩‍👧‍👦', 'I love my family very much.'),
          W('head', 'cái đầu', '🧠', 'I put a hat on my head.'),
          W('hand', 'bàn tay', '✋', 'Wash your hands before you eat.'),
          W('foot', 'bàn chân', '🦶', 'My foot is in the shoe.'),
          W('eye', 'con mắt', '👁️', 'I have blue eyes.'),
          W('ear', 'cái tai', '👂', 'My ear hurts a little.'),
          W('nose', 'cái mũi', '👃', 'The clown has a red nose.'),
          W('mouth', 'cái miệng', '👄', 'Open your mouth and say ah.'),
          W('hair', 'mái tóc', '💇', 'She has long black hair.')
        ]
      },
      {
        id: 'school',
        name: 'School & Toys',
        vi: 'Trường học & Đồ chơi',
        icon: '🎒',
        tone: 5,
        words: [
          W('book', 'quyển sách', '📘', 'This book has many pictures.'),
          W('pen', 'cái bút', '🖊️', 'I write with a blue pen.'),
          W('pencil', 'bút chì', '✏️', 'My pencil is yellow.'),
          W('ruler', 'thước kẻ', '📏', 'I draw lines with my ruler.'),
          W('school bag', 'cặp sách', '🎒', 'My school bag is heavy.'),
          W('rubber', 'cục tẩy', '🧽', 'I use a rubber to clean my page.'),
          W('crayon', 'bút màu', '🖍️', 'She colours with crayons.'),
          W('ball', 'quả bóng', '⚽', 'The boys play with a ball.'),
          W('doll', 'búp bê', '🎎', 'My doll has a pink dress.'),
          W('kite', 'cái diều', '🪁', 'We fly a kite in the park.'),
          W('bike', 'xe đạp', '🚲', 'I ride my bike to school.'),
          W('train', 'tàu hỏa', '🚂', 'My toy train is very long.'),
          W('teddy bear', 'gấu bông', '🧸', 'I sleep with my teddy bear.'),
          W('computer', 'máy tính', '💻', 'I play games on the computer.'),
          W('clock', 'đồng hồ', '🕐', 'The clock shows eight o clock.'),
          W('puzzle', 'trò xếp hình', '🧩', 'This puzzle has fifty pieces.')
        ]
      },
      {
        id: 'clothes',
        name: 'Clothes',
        vi: 'Quần áo',
        icon: '👕',
        tone: 6,
        words: [
          W('shirt', 'áo sơ mi', '👔', 'My shirt is white and clean.'),
          W('T-shirt', 'áo phông', '👕', 'I wear a T-shirt in summer.'),
          W('dress', 'váy liền', '👗', 'She has a pretty red dress.'),
          W('skirt', 'chân váy', '👚', 'Her skirt is pink and blue.'),
          W('trousers', 'quần dài', '👖', 'These trousers are too long.'),
          W('shoes', 'giày', '👟', 'My new shoes are very fast.'),
          W('socks', 'tất', '🧦', 'I have funny yellow socks.'),
          W('hat', 'mũ', '👒', 'Wear a hat in the sun.'),
          W('jacket', 'áo khoác', '🧥', 'My jacket is warm and blue.'),
          W('scarf', 'khăn quàng', '🧣', 'She wears a scarf in winter.'),
          W('gloves', 'găng tay', '🧤', 'I wear gloves when it is cold.'),
          W('shorts', 'quần đùi', '🩳', 'He wears shorts in the summer.'),
          W('jumper', 'áo len', '🧶', 'My jumper is soft and warm.'),
          W('boots', 'bốt', '🥾', 'I wear boots in the rain.'),
          W('cap', 'mũ lưỡi trai', '🧢', 'His cap is blue and white.')
        ]
      }
    ]
  };
})();
