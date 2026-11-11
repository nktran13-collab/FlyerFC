/* Cambridge English: A1 Movers vocabulary */
window.VOCAB = window.VOCAB || {};
(function () {
  const W = (en, vi, emoji, ex) => ({ en, vi, emoji, ex });

  window.VOCAB.movers = {
    meta: {
      id: 'movers',
      name: 'Movers',
      vi: 'A1',
      emoji: '🦊',
      tagline: 'Khám phá thêm nhiều',
      mascot: '🦊'
    },
    topics: [
      {
        id: 'animals',
        name: 'Animals',
        vi: 'Động vật',
        icon: '🐬',
        tone: 1,
        words: [
          W('dolphin', 'cá heo', '🐬', 'The dolphin is jumping out of the sea.'),
          W('whale', 'cá voi', '🐳', 'A whale is a very big animal.'),
          W('shark', 'cá mập', '🦈', 'The shark has sharp teeth.'),
          W('panda', 'gấu trúc', '🐼', 'The panda eats bamboo.'),
          W('giraffe', 'hươu cao cổ', '🦒', 'The giraffe has a very long neck.'),
          W('hippo', 'hà mã', '🦛', 'The hippo is in the river.'),
          W('crocodile', 'cá sấu', '🐊', 'The crocodile has a long tail.'),
          W('parrot', 'con vẹt', '🦜', 'My parrot can say hello.'),
          W('penguin', 'chim cánh cụt', '🐧', 'Penguins live in cold places.'),
          W('kangaroo', 'chuột túi', '🦘', 'A kangaroo can jump very far.'),
          W('spider', 'con nhện', '🕷️', 'The spider is on the wall.'),
          W('butterfly', 'con bướm', '🦋', 'The butterfly is on the flower.'),
          W('bee', 'con ong', '🐝', 'The bee makes honey.'),
          W('squirrel', 'con sóc', '🐿️', 'The squirrel has a big tail.'),
          W('bat', 'con dơi', '🦇', 'Bats sleep in the day.'),
          W('owl', 'con cú', '🦉', 'The owl has big eyes.')
        ]
      },
      {
        id: 'food',
        name: 'Food & Drink',
        vi: 'Đồ ăn & Thức uống',
        icon: '🥪',
        tone: 2,
        words: [
          W('sandwich', 'bánh mì kẹp', '🥪', 'I have a cheese sandwich for lunch.'),
          W('burger', 'bánh hamburger', '🍔', 'This burger is very big.'),
          W('pasta', 'mì Ý', '🍝', 'We eat pasta with tomato sauce.'),
          W('soup', 'súp', '🍲', 'Grandma makes chicken soup.'),
          W('pancakes', 'bánh kếp', '🥞', 'We have pancakes with honey.'),
          W('salad', 'món rau trộn', '🥗', 'This salad is fresh and green.'),
          W('strawberry', 'quả dâu tây', '🍓', 'Strawberries are red and sweet.'),
          W('pineapple', 'quả dứa', '🍍', 'The pineapple is big and yellow.'),
          W('lemon', 'quả chanh', '🍋', 'This lemon is very sour.'),
          W('tomato', 'quả cà chua', '🍅', 'I put a tomato in my salad.'),
          W('carrot', 'củ cà rốt', '🥕', 'Rabbits like carrots.'),
          W('potato', 'củ khoai tây', '🥔', 'We cook potatoes in the oven.'),
          W('onion', 'củ hành', '🧅', 'The onion makes me cry.'),
          W('butter', 'bơ', '🧈', 'I put butter on my bread.'),
          W('yoghurt', 'sữa chua', '🍦', 'I eat yoghurt with fruit.'),
          W('cereal', 'ngũ cốc', '🥣', 'I have cereal and milk for breakfast.')
        ]
      },
      {
        id: 'home',
        name: 'Home & Furniture',
        vi: 'Nhà cửa & Nội thất',
        icon: '🛋️',
        tone: 3,
        words: [
          W('sofa', 'ghế sofa', '🛋️', 'The cat is sleeping on the sofa.'),
          W('armchair', 'ghế bành', '🪑', 'Grandpa sits in his armchair.'),
          W('bed', 'cái giường', '🛏️', 'My bed has a red blanket.'),
          W('wardrobe', 'tủ quần áo', '🚪', 'My clothes are in the wardrobe.'),
          W('mirror', 'cái gương', '🪞', 'I look in the mirror every morning.'),
          W('lamp', 'đèn ngủ', '💡', 'Please turn on the lamp.'),
          W('fridge', 'tủ lạnh', '🧊', 'The milk is in the fridge.'),
          W('cooker', 'bếp nấu', '🍳', 'Mum is using the cooker.'),
          W('cupboard', 'tủ chén', '🗄️', 'The plates are in the cupboard.'),
          W('bath', 'bồn tắm', '🛁', 'The duck is in the bath.'),
          W('shower', 'vòi hoa sen', '🚿', 'I take a shower after football.'),
          W('stairs', 'cầu thang', '🪜', 'I run down the stairs.'),
          W('balcony', 'ban công', '🏠', 'We have flowers on the balcony.'),
          W('curtain', 'rèm cửa', '🪟', 'Close the curtain, please.'),
          W('carpet', 'tấm thảm', '🧶', 'The carpet is soft and warm.'),
          W('pillow', 'cái gối', '🛌', 'My pillow is very soft.')
        ]
      },
      {
        id: 'jobs',
        name: 'Jobs',
        vi: 'Nghề nghiệp',
        icon: '👮',
        tone: 4,
        words: [
          W('doctor', 'bác sĩ', '👩‍⚕️', 'The doctor helps sick people.'),
          W('nurse', 'y tá', '👨‍⚕️', 'The nurse is kind and friendly.'),
          W('dentist', 'nha sĩ', '🦷', 'The dentist looks at my teeth.'),
          W('teacher', 'giáo viên', '👩‍🏫', 'Our teacher reads us stories.'),
          W('farmer', 'nông dân', '👨‍🌾', 'The farmer works in the field.'),
          W('chef', 'đầu bếp', '👨‍🍳', 'The chef makes wonderful food.'),
          W('pilot', 'phi công', '👨‍✈️', 'The pilot flies the plane.'),
          W('driver', 'tài xế', '🚕', 'The bus driver is very nice.'),
          W('police officer', 'cảnh sát', '👮', 'The police officer helps people.'),
          W('firefighter', 'lính cứu hỏa', '👨‍🚒', 'The firefighter puts out fires.'),
          W('artist', 'họa sĩ', '🎨', 'The artist paints beautiful pictures.'),
          W('singer', 'ca sĩ', '🎤', 'The singer has a lovely voice.'),
          W('musician', 'nhạc sĩ', '🎸', 'The musician plays the guitar.'),
          W('mechanic', 'thợ sửa xe', '🔧', 'The mechanic fixes my bike.'),
          W('postman', 'người đưa thư', '📮', 'The postman brings us letters.'),
          W('shop assistant', 'nhân viên bán hàng', '🛍️', 'The shop assistant is very helpful.')
        ]
      },
      {
        id: 'sports',
        name: 'Sports & Hobbies',
        vi: 'Thể thao & Sở thích',
        icon: '⚽',
        tone: 5,
        words: [
          W('football', 'bóng đá', '⚽', 'We play football after school.'),
          W('basketball', 'bóng rổ', '🏀', 'He is very good at basketball.'),
          W('tennis', 'quần vợt', '🎾', 'I play tennis with my dad.'),
          W('swimming', 'bơi lội', '🏊', 'Swimming is fun in the summer.'),
          W('cycling', 'đạp xe', '🚴', 'We go cycling in the park.'),
          W('running', 'chạy bộ', '🏃', 'Running makes me strong.'),
          W('dancing', 'nhảy múa', '💃', 'She loves dancing to music.'),
          W('singing', 'hát', '🎤', 'Singing makes me happy.'),
          W('painting', 'vẽ tranh', '🎨', 'Painting is my favourite hobby.'),
          W('reading', 'đọc sách', '📖', 'Reading books is very relaxing.'),
          W('chess', 'cờ vua', '♟️', 'My grandpa teaches me chess.'),
          W('karate', 'võ karate', '🥋', 'He goes to karate class on Monday.'),
          W('skateboarding', 'trượt ván', '🛹', 'Skateboarding looks very cool.'),
          W('fishing', 'câu cá', '🎣', 'We go fishing at the lake.'),
          W('cooking', 'nấu ăn', '🍳', 'Cooking with mum is fun.'),
          W('photography', 'chụp ảnh', '📷', 'Photography is his new hobby.')
        ]
      },
      {
        id: 'places',
        name: 'Places & Transport',
        vi: 'Địa điểm & Phương tiện',
        icon: '🚌',
        tone: 6,
        words: [
          W('hospital', 'bệnh viện', '🏥', 'The hospital is near my house.'),
          W('library', 'thư viện', '📚', 'I borrow books from the library.'),
          W('museum', 'bảo tàng', '🏛️', 'The museum has old dinosaurs.'),
          W('cinema', 'rạp chiếu phim', '🎬', 'We watch a film at the cinema.'),
          W('supermarket', 'siêu thị', '🛒', 'Mum buys food at the supermarket.'),
          W('restaurant', 'nhà hàng', '🍽️', 'We have dinner at a restaurant.'),
          W('park', 'công viên', '🌳', 'Children play in the park.'),
          W('zoo', 'sở thú', '🦁', 'I love the monkeys at the zoo.'),
          W('airport', 'sân bay', '✈️', 'The plane is at the airport.'),
          W('station', 'nhà ga', '🚉', 'We wait for the train at the station.'),
          W('bus', 'xe buýt', '🚌', 'I go to school by bus.'),
          W('train', 'tàu hỏa', '🚆', 'The train is fast and long.'),
          W('plane', 'máy bay', '✈️', 'The plane flies above the clouds.'),
          W('boat', 'con thuyền', '⛵', 'We sail a boat on the lake.'),
          W('helicopter', 'máy bay trực thăng', '🚁', 'The helicopter is very noisy.'),
          W('motorbike', 'xe máy', '🏍️', 'My dad rides a motorbike.')
        ]
      }
    ]
  };
})();
