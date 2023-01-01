"use strict";

const nyancat_gameboy = JSON.parse(
  '{"music":"./nyan_cats/gameboy/nyancat_gameboy.mp3","rainbow_end_x": 29,"colors":{"rainbow":["#18343B","#1F4A3B","#4B766F","#445143","#4B7643","#9DB94A"],"background":"#114475","stars":"white","shape":"black","skin":"#A8A8A8","body":["#CCCCCC","#333333","#660000","#339933","#8C083A"],"head":["#A8A8A8","black","white","#FFA3A4"]},"stars":{"positions":[[1,76,0],[23,57,0],[14,15,2],[6,54,4],[10,30,1]],"stages":[[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,1,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,1,0,0,0],[0,0,1,0,1,0,0],[0,0,0,1,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],[[0,0,0,0,0,0,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[0,1,1,0,1,1,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[0,0,0,0,0,0,0]],[[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[0,0,0,0,0,0,0],[1,1,0,1,0,1,1],[0,0,0,0,0,0,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0]],[[0,0,0,1,0,0,0],[0,1,0,0,0,1,0],[0,0,0,0,0,0,0],[1,0,0,0,0,0,1],[0,0,0,0,0,0,0],[0,1,0,0,0,1,0],[0,0,0,1,0,0,0]],[[0,0,0,1,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,0,0,0,0,0,1],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,1,0,0,0]]]},"body":{"shape":[[3,30],[4,29],[5,28],[6,28],[7,28],[8,28],[9,28],[10,28],[11,28],[12,28],[13,28],[14,28],[15,28],[16,28],[17,28],[18,28],[19,29],[20,30],[20,31],[20,32],[20,33],[20,34],[20,35],[3,31],[3,32],[3,33],[3,34],[3,35],[3,36],[3,37],[3,38],[3,39],[3,40],[3,41],[3,42],[3,43],[3,44],[3,45],[3,46],[3,47],[4,48],[5,49],[6,49],[7,49],[9,49],[8,49],[10,49],[20,47],[19,48],[20,46],[20,45],[20,44],[20,43],[20,42],[20,41],[20,40],[20,39],[20,38],[20,37],[20,36]],"fill":[[[4,30],[4,31],[4,32],[4,33],[4,34],[4,35],[4,36],[4,37],[4,38],[4,39],[4,40],[4,41],[4,42],[4,43],[4,44],[4,45],[4,46],[4,47],[5,48],[5,47],[5,46],[5,45],[5,42],[5,41],[5,40],[5,29],[6,29],[7,29],[8,29],[9,29],[10,29],[11,29],[12,29],[13,29],[14,29],[15,29],[16,29],[17,29],[18,29],[19,30],[19,31],[19,32],[19,33],[19,34],[19,35],[19,36],[19,38],[19,37],[19,39],[19,40],[19,41],[18,40],[7,40],[6,40],[6,41],[6,42],[7,43],[7,44],[6,45],[6,46],[6,47],[6,48],[7,48],[7,47],[7,46],[7,45],[8,45],[8,46],[8,47],[8,48],[9,48],[9,47],[9,46],[9,45],[10,48],[7,42],[9,40],[10,40],[11,40],[12,40],[8,41],[9,41],[10,45],[10,46],[10,47]],[[18,30],[17,30],[16,30],[15,30],[14,30],[13,30],[12,30],[11,30],[10,30],[9,30],[8,30],[7,30],[6,30],[5,30],[5,31],[6,31],[7,31],[8,31],[9,31],[10,31],[11,31],[12,31],[13,31],[14,31],[15,31],[16,31],[17,31],[18,31],[18,32],[18,33],[18,34],[18,36],[18,37],[18,38],[17,32],[17,33],[17,34],[17,35],[17,36],[17,37],[17,38],[5,39],[5,32],[5,33],[5,34],[5,35],[5,36],[5,37],[5,38],[6,39],[6,38],[6,37],[6,36],[6,35],[6,34],[6,33],[6,32],[7,39],[8,39],[7,38],[8,38],[9,39],[9,38],[10,39],[10,38],[11,39],[11,38],[12,38],[13,38],[14,38],[15,38],[16,38],[17,39],[18,39],[12,39],[13,39],[14,39],[15,39],[16,39]],[[18,35]],[[7,32],[7,33],[7,34],[7,35],[7,36],[7,37],[8,37],[8,36],[8,35],[8,34],[8,33],[8,32],[9,32],[9,33],[9,34],[9,35],[9,36],[9,37],[10,37],[10,36],[10,35],[10,34],[10,33],[10,32],[11,32],[11,33],[11,34],[11,35],[11,36],[11,37],[12,37],[12,36],[12,35],[12,34],[12,33],[12,32],[13,32],[13,33],[13,34],[13,35],[13,36],[13,37],[14,37],[14,36],[14,35],[14,34],[14,33],[14,32],[15,32],[15,33],[15,34],[15,35],[15,36],[15,37],[16,37],[16,36],[16,35],[16,34],[16,33],[16,32]],[[9,44],[8,44],[8,43],[6,43],[6,44],[5,44],[5,43]]]},"head":{"shape":[[8,51],[9,50],[8,52],[9,53],[10,53],[11,53],[12,53],[10,49],[11,48],[11,47],[11,46],[11,45],[13,54],[14,54],[15,54],[16,54],[17,54],[18,53],[19,52],[20,51],[20,50],[20,49],[20,48],[20,47],[20,46],[10,44],[9,43],[8,42],[8,41],[9,40],[10,40],[11,40],[12,40],[13,39],[14,39],[15,39],[16,39],[17,39],[18,40],[19,41],[20,42],[20,43],[20,44],[20,45],[18,50],[17,50],[18,49],[18,48],[18,47],[17,47],[18,46],[18,45],[18,44],[17,44],[15,48]],"fill":[[[9,41],[9,42],[10,41],[10,42],[10,43],[11,41],[11,42],[11,43],[11,44],[12,41],[12,42],[12,43],[12,44],[12,45],[12,46],[12,47],[12,48],[9,51],[9,52],[10,52],[10,51],[10,50],[11,52],[11,51],[11,50],[11,49],[12,49],[12,50],[12,51],[12,52],[13,53],[13,52],[13,51],[13,50],[13,49],[13,48],[13,47],[13,46],[13,45],[13,44],[13,43],[13,42],[13,41],[13,40],[14,40],[14,41],[14,42],[14,45],[14,46],[14,47],[14,48],[14,49],[14,52],[14,53],[15,53],[15,52],[15,49],[15,47],[15,46],[15,45],[15,42],[15,41],[15,40],[16,40],[17,40],[16,43],[16,44],[16,45],[16,46],[16,47],[16,48],[16,49],[16,50],[16,51],[17,51],[17,48],[17,49],[17,46],[17,45],[17,43],[18,43],[18,42],[18,41],[18,51],[18,52],[19,51],[19,50],[19,49],[19,48],[19,47],[19,46],[19,45],[19,44],[19,43],[19,42]],[[15,50],[15,51],[14,51],[15,44],[14,44],[15,43]],[[14,43],[14,50]],[[17,52],[16,52],[16,53],[17,53],[17,42],[16,42],[16,41],[17,41]]]},"paws":{"shape":[[21,41],[22,42],[22,43],[22,44],[21,44],[21,46],[22,47],[22,48],[22,49],[20,49],[21,49],[21,30],[22,31],[22,32],[22,33],[21,33],[18,27],[19,26],[20,25],[21,25],[22,25],[22,26],[22,27],[21,28],[20,29]],"fill":[[19,28],[19,27],[20,28],[20,27],[20,26],[21,26],[21,27],[21,31],[21,32],[21,42],[21,43],[21,47],[21,48],[20,48],[20,47]]},"tail":{"shapes":[[[15,27],[15,26],[14,25],[14,24],[13,23],[12,22],[11,22],[10,23],[10,24],[11,25],[12,25],[12,26],[12,27]],[[15,27],[14,27],[14,26],[14,25],[13,25],[13,24],[12,24],[12,23],[11,23],[11,22],[10,22],[9,22],[9,23],[9,24],[9,25],[10,25],[10,26],[11,26],[11,27],[12,27]],[[16,27],[16,26],[15,25],[15,24],[14,23],[13,22],[12,22],[11,23],[11,24],[12,25],[13,25],[13,26],[13,27]],[[13,27],[14,27],[14,26],[14,25],[14,24],[15,23],[15,22],[16,22],[17,23],[17,24],[17,25],[17,26],[16,26],[16,27]],[[13,27],[13,26],[14,25],[14,24],[15,23],[16,22],[17,22],[18,23],[18,24],[17,25],[16,25],[16,26],[16,27]],[[15,27],[15,26],[14,26],[14,25],[14,24],[14,23],[13,22],[13,21],[12,21],[11,22],[11,23],[11,24],[11,25],[12,25],[12,26],[12,27],[13,27]]],"fills":[[[11,23],[11,24],[12,24],[12,23],[13,24],[13,25],[13,26],[14,26],[14,27],[13,27]],[[13,27],[13,26],[12,26],[12,25],[11,25],[11,24],[10,24],[10,23]],[[12,23],[12,24],[13,24],[13,23],[14,24],[14,25],[14,26],[15,26],[15,27],[14,27]],[[15,27],[15,26],[15,25],[15,24],[16,25],[16,24],[16,23]],[[14,27],[14,26],[15,27],[15,26],[15,25],[15,24],[16,24],[16,23],[17,23],[17,24]],[[14,27],[13,26],[13,25],[13,24],[13,23],[12,24],[12,23],[12,22]]]}}'
);