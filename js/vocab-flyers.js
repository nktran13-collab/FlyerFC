/* Cambridge English: A2 Flyers vocabulary */
window.VOCAB = window.VOCAB || {};
(function () {
  const W = (en, vi, emoji, ex) => ({ en, vi, emoji, ex });

  window.VOCAB.flyers = {
    meta: {
      id: 'flyers',
      name: 'Flyers',
      vi: 'A2',
      emoji: '🦄',
      tagline: 'Chinh phục thử thách',
      mascot: '🦄'
    },
    topics: [
      {
        id: 'nature',
        name: 'Animals & Nature',
        vi: 'Thiên nhiên',
        icon: '🏔️',
        tone: 1,
        words: [
          W('mountain', 'ngọn núi', '⛰️', 'The mountain is covered with snow.'),
          W('river', 'con sông', '🏞️', 'The river flows through the town.'),
          W('lake', 'hồ nước', '🌊', 'We swim in the lake in summer.'),
          W('forest', 'khu rừng', '🌲', 'Many animals live in the forest.'),
          W('island', 'hòn đảo', '🏝️', 'This island is small and quiet.'),
          W('beach', 'bãi biển', '🏖️', 'We build sandcastles on the beach.'),
          W('desert', 'sa mạc', '🏜️', 'The desert is hot and dry.'),
          W('waterfall', 'thác nước', '💦', 'The waterfall is very loud.'),
          W('cave', 'hang động', '🕳️', 'Bats live in this dark cave.'),
          W('volcano', 'núi lửa', '🌋', 'The volcano is not active now.'),
          W('rainbow', 'cầu vồng', '🌈', 'A rainbow appears after the rain.'),
          W('storm', 'cơn bão', '⛈️', 'The storm broke the old tree.'),
          W('branch', 'cành cây', '🌿', 'A bird sits on the branch.'),
          W('leaf', 'chiếc lá', '🍃', 'The leaf turns yellow in autumn.'),
          W('seed', 'hạt giống', '🌱', 'Plant the seed in the soil.'),
          W('nest', 'tổ chim', '🪺', 'There are two eggs in the nest.')
        ]
      },
      {
        id: 'food',
        name: 'Food & Meals',
        vi: 'Món ăn & Bữa ăn',
        icon: '🍽️',
        tone: 2,
        words: [
          W('breakfast', 'bữa sáng', '🍳', 'We have breakfast at seven.'),
          W('lunch', 'bữa trưa', '🍱', 'I eat lunch at school.'),
          W('dinner', 'bữa tối', '🍲', 'Dinner is ready at half past six.'),
          W('snack', 'đồ ăn nhẹ', '🍪', 'Fruit is a healthy snack.'),
          W('dessert', 'món tráng miệng', '🍮', 'Ice cream is my favourite dessert.'),
          W('honey', 'mật ong', '🍯', 'Bees make honey.'),
          W('pepper', 'hạt tiêu', '🌶️', 'Add some pepper to the soup.'),
          W('salt', 'muối', '🧂', 'This soup needs a little salt.'),
          W('flour', 'bột mì', '🌾', 'We need flour to make bread.'),
          W('sugar', 'đường', '🍬', 'How much sugar do you want?'),
          W('garlic', 'tỏi', '🧄', 'Garlic makes the food taste good.'),
          W('mushroom', 'nấm', '🍄', 'Mushrooms grow in the forest.'),
          W('pumpkin', 'quả bí ngô', '🎃', 'We make soup from pumpkin.'),
          W('coconut', 'quả dừa', '🥥', 'This coconut has sweet water.'),
          W('watermelon', 'quả dưa hấu', '🍉', 'Watermelon is perfect in summer.'),
          W('peas', 'đậu Hà Lan', '🫛', 'Peas are small and green.')
        ]
      },
      {
        id: 'jobs',
        name: 'Jobs & Work',
        vi: 'Nghề nghiệp & Công việc',
        icon: '💼',
        tone: 3,
        words: [
          W('engineer', 'kỹ sư', '👷', 'The engineer builds strong bridges.'),
          W('scientist', 'nhà khoa học', '👩‍🔬', 'The scientist studies plants.'),
          W('journalist', 'nhà báo', '📰', 'The journalist writes about the news.'),
          W('photographer', 'nhiếp ảnh gia', '📸', 'The photographer takes wedding photos.'),
          W('architect', 'kiến trúc sư', '📐', 'The architect draws plans for houses.'),
          W('lawyer', 'luật sư', '⚖️', 'The lawyer helps people with the law.'),
          W('accountant', 'kế toán', '🧮', 'The accountant counts the money.'),
          W('programmer', 'lập trình viên', '💻', 'The programmer writes computer games.'),
          W('translator', 'phiên dịch viên', '🗣️', 'The translator speaks three languages.'),
          W('vet', 'bác sĩ thú y', '🐾', 'The vet helps sick animals.'),
          W('actor', 'diễn viên', '🎭', 'The actor is famous around the world.'),
          W('director', 'đạo diễn', '🎬', 'The director made a funny film.'),
          W('manager', 'quản lý', '📋', 'The manager has a big office.'),
          W('receptionist', 'lễ tân', '🛎️', 'The receptionist gave us a room key.'),
          W('waiter', 'bồi bàn', '🍷', 'The waiter brought us the menu.'),
          W('tour guide', 'hướng dẫn viên', '🧭', 'Our tour guide knows the city well.')
        ]
      },
      {
        id: 'travel',
        name: 'Travel & Places',
        vi: 'Du lịch & Địa điểm',
        icon: '🧳',
        tone: 4,
        words: [
          W('passport', 'hộ chiếu', '🛂', 'Do not forget your passport.'),
          W('luggage', 'hành lý', '🧳', 'Our luggage is very heavy.'),
          W('ticket', 'vé', '🎫', 'I bought two train tickets.'),
          W('hotel', 'khách sạn', '🏨', 'We stayed in a small hotel.'),
          W('castle', 'lâu đài', '🏰', 'The castle is on the hill.'),
          W('temple', 'ngôi đền', '⛩️', 'The old temple is beautiful.'),
          W('bridge', 'cây cầu', '🌉', 'The bridge crosses the river.'),
          W('harbour', 'bến cảng', '⚓', 'Boats are waiting in the harbour.'),
          W('market', 'chợ', '🛍️', 'We buy fruit at the market.'),
          W('stadium', 'sân vận động', '🏟️', 'The match is at the stadium.'),
          W('theatre', 'nhà hát', '🎭', 'We saw a play at the theatre.'),
          W('gallery', 'phòng triển lãm', '🖼️', 'The gallery is free on Sunday.'),
          W('tower', 'tòa tháp', '🗼', 'You can see the city from the tower.'),
          W('fountain', 'đài phun nước', '⛲', 'People meet near the fountain.'),
          W('campsite', 'khu cắm trại', '🏕️', 'We slept in a tent at the campsite.'),
          W('souvenir', 'quà lưu niệm', '🎁', 'I bought a souvenir for my sister.')
        ]
      },
      {
        id: 'study',
        name: 'School & Study',
        vi: 'Học tập',
        icon: '📚',
        tone: 5,
        words: [
          W('dictionary', 'từ điển', '📖', 'Look up the word in a dictionary.'),
          W('notebook', 'quyển vở', '📓', 'Write the answers in your notebook.'),
          W('textbook', 'sách giáo khoa', '📗', 'Open your textbook at page ten.'),
          W('exam', 'kỳ thi', '📝', 'The exam starts at nine o clock.'),
          W('test', 'bài kiểm tra', '✅', 'I got ten out of ten in the test.'),
          W('homework', 'bài tập về nhà', '📝', 'I do my homework after dinner.'),
          W('project', 'bài dự án', '🗂️', 'Our project is about animals.'),
          W('lesson', 'bài học', '🧑‍🏫', 'The lesson was easy to understand.'),
          W('subject', 'môn học', '📚', 'Science is my favourite subject.'),
          W('geography', 'địa lý', '🌍', 'We learn about rivers in geography.'),
          W('history', 'lịch sử', '🏺', 'History tells us about the past.'),
          W('science', 'khoa học', '🔬', 'We do experiments in science.'),
          W('mathematics', 'toán học', '➗', 'Mathematics helps us count things.'),
          W('art', 'mỹ thuật', '🎨', 'We paint pictures in art class.'),
          W('music', 'âm nhạc', '🎵', 'Music class is always fun.'),
          W('break', 'giờ giải lao', '🔔', 'We play outside at break.')
        ]
      },
      {
        id: 'feelings',
        name: 'Feelings & Actions',
        vi: 'Cảm xúc & Hành động',
        icon: '😊',
        tone: 6,
        words: [
          W('excited', 'háo hức', '🤩', 'I am excited about the school trip.'),
          W('nervous', 'lo lắng', '😰', 'She feels nervous before the exam.'),
          W('proud', 'tự hào', '🥰', 'My parents are proud of me.'),
          W('bored', 'chán', '😴', 'He is bored on rainy days.'),
          W('surprised', 'ngạc nhiên', '😲', 'I was surprised by the big cake.'),
          W('worried', 'lo lắng, bồn chồn', '😟', 'Mum is worried about the storm.'),
          W('curious', 'tò mò', '🤔', 'The curious girl asks many questions.'),
          W('generous', 'hào phóng', '🎁', 'He is generous and shares his toys.'),
          W('polite', 'lịch sự', '🙏', 'Always be polite to your teachers.'),
          W('brave', 'dũng cảm', '🦁', 'The brave boy helped the small child.'),
          W('cheerful', 'vui vẻ', '😄', 'Her cheerful smile makes me happy.'),
          W('whisper', 'thì thầm', '🤫', 'Please whisper in the library.'),
          W('shout', 'hét lên', '📢', 'Do not shout in the classroom.'),
          W('giggle', 'khúc khích cười', '😆', 'The children giggle at the funny clown.'),
          W('promise', 'hứa', '🤝', 'I promise to finish my homework.'),
          W('celebrate', 'ăn mừng', '🎉', 'We celebrate her birthday with a party.')
        ]
      }
    ]
  };
})();
