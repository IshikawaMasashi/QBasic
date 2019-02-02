export declare const conwaysGameOfLife = "\n;;An R6RS Scheme implementation of Conway's Game of Life --- assumes\n;;all cells outside the defined grid are dead\n \n;if n is outside bounds of list, return 0 else value at n\n(define (nth n lst)\n  (cond ((> n (length lst)) 0)\n        ((< n 1) 0)\n        ((= n 1) (car lst))\n        (else (nth (- n 1) (cdr lst)))))\n \n;return the next state of the supplied universe\n(define (next-universe universe)\n  ;value at (x, y)\n  (define (cell x y)\n    (if (list? (nth y universe))\n        (nth x (nth y universe))\n        0))\n  ;sum of the values of the cells surrounding (x, y)\n  (define (neighbor-sum x y)\n    (+ (cell (- x 1) (- y 1))\n       (cell (- x 1) y)\n       (cell (- x 1) (+ y 1))\n       (cell x (- y 1))\n       (cell x (+ y 1))\n       (cell (+ x 1) (- y 1))\n       (cell (+ x 1) y)\n       (cell (+ x 1) (+ y 1))))\n  ;next state of the cell at (x, y)\n  (define (next-cell x y)\n    (let ((cur (cell x y))\n          (ns (neighbor-sum x y)))\n      (cond ((and (= cur 1)\n                  (or (< ns 2) (> ns 3)))\n             0)\n            ((and (= cur 0) (= ns 3))\n             1)\n            (else cur))))\n  ;next state of row n\n  (define (row n out)\n    (let ((w (length (car universe))))\n      (if (= (length out) w)\n          out\n          (row n\n               (cons (next-cell (- w (length out)) n)\n                     out)))))\n  ;a range of ints from bot to top\n  (define (int-range bot top)\n    (if (> bot top) '()\n        (cons bot (int-range (+ bot 1) top))))\n  (map (lambda (n)\n         (row n '()))\n       (int-range 1 (length universe))))\n \n;represent the universe as a string\n(define (universe->string universe)\n  (define (prettify row)\n    (apply string-append\n           (map (lambda (b)\n                  (if (= b 1) \"#\" \"-\"))\n                row)))\n  (if (null? universe)\n      \"\"\n      (string-append (prettify (car universe))\n                     \"\n\"\n                     (universe->string (cdr universe)))))\n \n;starting with seed, show reps states of the universe\n(define (conway seed reps)\n  (when (> reps 0)\n    (display (universe->string seed))\n    (newline)\n    (conway (next-universe seed) (- reps 1))))\n \n;; --- Example Universes --- ;;\n \n;blinker in a 3x3 universe\n(conway '((0 1 0)\n          (0 1 0)\n          (0 1 0)) 5)\n \n;glider in an 8x8 universe\n(conway '((0 0 1 0 0 0 0 0)\n          (0 0 0 1 0 0 0 0)\n          (0 1 1 1 0 0 0 0)\n          (0 0 0 0 0 0 0 0)\n          (0 0 0 0 0 0 0 0)\n          (0 0 0 0 0 0 0 0)\n          (0 0 0 0 0 0 0 0)\n          (0 0 0 0 0 0 0 0)) 30)";
