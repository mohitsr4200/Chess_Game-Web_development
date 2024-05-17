
var Board = function(width, light_square, dark_square, select_color) {

    const white = 0,black = 1;
    const P = 1;   //white
    const N = 2;
    const B = 3;
    const R = 4;
    const Q = 5;
    const K = 6;

    const p = 7;    //black
    const n = 8;
    const b = 9;
    const r = 10;
    const q = 11;
    const k = 12;

    const o = 13; //Occupied  square
    const e = 0; // Unoccupied  square

    const no_sq = 120;
    const a8 = 0, b8 = 1, c8 = 2, d8 = 3, e8 = 4, f8 = 5, g8 = 6, h8 = 7;
    const a7 = 16, b7 = 17, c7 = 18, d7 = 19, e7 = 20, f7 = 21, g7 = 22, h7 = 23;
    const a6 = 32,b6 = 33,c6 = 34, d6 = 35, e6 = 36,  f6 = 37,  g6 = 39,  h6 = 40;
    const a5 = 48, b5 = 49, c5 = 50, d5 = 51,  e5 = 52,  f5 = 53,  g5 = 54,  h5 = 55;
    const a4 = 64, b4 = 65, c4 = 66, d4 = 67,  e4 = 68,  f4 = 69,  g4 = 70,  h4 = 71;
    const a3 = 80, b3 = 81, c3 = 82, d3 = 83,  e3 = 84,  f3 = 85,  g3 = 86,  h3 = 87;
    const a2 = 96, b2 = 97, c2 = 98, d2 = 99,  e2 = 100, f2 = 101, g2 = 102, h2 = 103;
    const a1 = 112, b1 = 113, c1 = 114, d1 = 115, e1 = 116, f1 = 117, g1 = 118, h1 = 119;

    const coordinates = [
        'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8', 'i8', 'j8', 'k8', 'l8', 'm8', 'n8', 'o8', 'p8',
        'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7', 'i7', 'j7', 'k7', 'l7', 'm7', 'n7', 'o7', 'p7',
        'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6', 'i6', 'j6', 'k6', 'l6', 'm6', 'n6', 'o6', 'p6',
        'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5', 'i5', 'j5', 'k5', 'l5', 'm5', 'n5', 'o5', 'p5',
        'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4', 'i4', 'j4', 'k4', 'l4', 'm4', 'n4', 'o4', 'p4',
        'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3', 'i3', 'j3', 'k3', 'l3', 'm3', 'n3', 'o3', 'p3',
        'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2', 'i2', 'j2', 'k2', 'l2', 'm2', 'n2', 'o2', 'p2',
        'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1', 'i1', 'j1', 'k1', 'l1', 'm1', 'n1', 'o1', 'p1'
    ];

    //  promoted pieces
    var promoted_pieces = {
        [Q]: 'q', [R]: 'r', [B]: 'b', [N]: 'n',
        [q]: 'q', [r]: 'r', [b]: 'b', [n]: 'n'
    };

    const unicode_pieces = [
        //dot for empty
        '.',
        // chotku   ghora    utt      haathi      rani    raja
        '\u2659', '\u2658', '\u2657', '\u2656', '\u2655', '\u2654',

        '\u265F', '\u265E', '\u265D', '\u265C', '\u265B', '\u265A'
    ];

    const KC = 1, QC = 2, kc = 4, qc = 8;

    var knight_offsets = [33, 31, 18, 14, -33, -31, -18, -14];
    var bishop_offsets = [15, 17, -15, -17];
    var rook_offsets = [16, -16, 1, -1];
    var king_offsets = [16, -16, 1, -1, 15, 17, -15, -17];

    var castling_rights = [
        7, 15, 15, 15,  3, 15, 15, 11,  o, o, o, o, o, o, o, o,
        15, 15, 15, 15, 15, 15, 15, 15,  o, o, o, o, o, o, o, o,
        15, 15, 15, 15, 15, 15, 15, 15,  o, o, o, o, o, o, o, o,
        15, 15, 15, 15, 15, 15, 15, 15,  o, o, o, o, o, o, o, o,
        15, 15, 15, 15, 15, 15, 15, 15,  o, o, o, o, o, o, o, o,
        15, 15, 15, 15, 15, 15, 15, 15,  o, o, o, o, o, o, o, o,
        15, 15, 15, 15, 15, 15, 15, 15,  o, o, o, o, o, o, o, o,
        13, 15, 15, 12, 15, 15, 15, 14,  o, o, o, o, o, o, o, o
    ];

    // PST scores
    var board = [
        r, n, b, q, k, b, n, r,  0,  0,  5,  5,  0,  0,  5,  0,
        p, p, p, p, p, p, p, p,  5,  5,  0,  0,  0,  0,  5,  5,
        e, e, e, e, e, e, e, e,  5, 10, 15, 20, 20, 15, 10,  5,
        e, e, e, e, e, e, e, e,  5, 10, 20, 30, 30, 20, 10,  5,
        e, e, e, e, e, e, e, e,  5, 10, 20, 30, 30, 20, 10,  5,
        e, e, e, e, e, e, e, e,  5, 10, 15, 20, 20, 15, 10,  5,
        P, P, P, P, P, P, P, P,  5,  5,  0,  0,  0,  0,  5,  5,
        R, N, B, K, Q, B, N, R,  0,  0,  5,  5,  0,  0,  5,  0
    ];

    var side = white;
    var enpassant = no_sq;
    var castle = 15;
    var fifty = 0;
    var king_square = [d1, e8];
    var move_stack = {
        moves: new Array(1000),
        count: 0,
        size: 0
    }

    var random_state = 1804289383;
    function random() {
        var number = random_state;
        number ^= number << 13;
        number ^= number >> 17;
        number ^= number << 5;
        random_state = number;
        return number;
    }

    var piece_keys = new Array(13 * 128);
    var castle_keys = new Array(16);
    var side_key;
    function init_random_keys()
    {
        for (var index = 0; index < 13 * 128; index++)
            piece_keys[index] = random();
        for (var index = 0; index < 16; index++)
            castle_keys[index] = random();
        side_key = random();
    }


    var hash_key = 0;
    function generate_hash_key() {
        var final_key = 0;
        for(var square = 0; square < 128; square++)
        {
            if (!(square & 0x88))
            {
                var piece = board[square];
                if (piece != e)
                    final_key ^= piece_keys[(piece * 128) + square];
            }
        }
        if (side == white)
            final_key ^= side_key;
        if (enpassant != no_sq)
            final_key ^= piece_keys[enpassant];
        final_key ^= castle_keys[castle];
        return final_key;
    }


    function print_board() {
        var board_string = '';
        for (var rank = 0; rank < 8; rank++)
        {
            for (var file = 0; file < 16; file++)
            {
                var square = rank * 16 + file;
                if (!file)
                    board_string = board_string + (8 - rank).toString() + ' ';
                if (!(square & 0x88))
                {
                    var piece = board[square];
                    board_string = board_string + unicode_pieces[piece] + ' ';
                }
            }
            board_string += '\n'
        }
        board_string += '  a b c d e f g h';
        board_string += '\n\n  Side:     ' + ((!side) ? 'white': 'black');
        board_string += '\n  Castling:  ' + ((castle & KC) ? 'K' : '-') +
            ((castle & QC) ? 'Q' : '-') +
            ((castle & kc) ? 'k' : '-') +
            ((castle & qc) ? 'q' : '-');

        board_string += '\n  Ep: ' + ((enpassant == no_sq) ? 'no': coordinates[enpassant]);
        board_string += '\n\n  50 moves:    ' + fifty;
        board_string += '\n  Key: ' + hash_key;
        console.log(board_string);
    }

    function print_move(move) {
        if (get_move_piece(move))
            return coordinates[get_move_source(move)] +
                coordinates[get_move_target(move)] +
                promoted_pieces[get_move_piece(move)];

        else
            return coordinates[get_move_source(move)] +
                coordinates[get_move_target(move)];
    }

    function print_move_list(move_list) {
        var list_moves = 'Move     Capture  Double   Enpass   Castling\n\n';
        for (var index = 0; index < move_list.count; index++) {
            var move = move_list.moves[index];
            list_moves += coordinates[get_move_source(move)] + coordinates[get_move_target(move)];
            list_moves += (get_move_piece(move) ? promoted_pieces[get_move_piece(move)] : ' ');
            list_moves += '    ' + get_move_capture(move) +
                '        ' +get_move_pawn(move) +
                '        ' + get_move_enpassant(move) +
                '        ' + get_move_castling(move) + '\n';
        }

        list_moves += '\nTotal moves: ' + move_list.count;
        console.log(list_moves);

    }

    function reset_board() {
        for (var rank = 0; rank < 8; rank++)
        {
            for (var file = 0; file < 16; file++)
            {
                var square = rank * 16 + file;
                if (!(square & 0x88))
                    board[square] = e;
            }
        }
        side = -1;
        enpassant = no_sq;
        castle = 0;
        fifty = 0;
        hash_key = 0;
        king_square = [0, 0];
        move_stack = {
            moves: new Array(1000),
            count: 0,
            size: 0,
        }
    }

    function push_move(move) {
        move_stack.moves[move_stack.count] =
            {
            move: move,
            position: {
                board: JSON.parse(JSON.stringify(board)),
                side: side,
                en_passant: enpassant,
                castle: castle,
                hash_key: hash_key,
                fifty: fifty,
                king_square: JSON.parse(JSON.stringify(king_square))
            }
        };
        move_stack.count++;
        move_stack.size++;
    }

    function undo_move() {
        if (move_stack.count == move_stack.size)
            move_stack.count--;
        if (move_stack.count >= 1)
        {
            move_stack.count--;
            board = JSON.parse(JSON.stringify(move_stack.moves[move_stack.count].position.board));
            side = move_stack.moves[move_stack.count].position.side;
            en_passant: move_stack.moves[move_stack.count].position.en_passant;
            castle: move_stack.moves[move_stack.count].position.castle;
            hash_key: move_stack.moves[move_stack.count].position.hash_key;
            fifty: move_stack.moves[move_stack.count].position.fifty;
            king_square: JSON.parse(JSON.stringify(move_stack.moves[move_stack.count].position.king_square))
            draw_board();
            update_board();
        }
    }


    function redo_move() {
        if (move_stack.count < move_stack.size - 1) {
            move_stack.count++;
            board = JSON.parse(JSON.stringify(move_stack.moves[move_stack.count].position.board));
            side = move_stack.moves[move_stack.count].position.side;
            en_passant: move_stack.moves[move_stack.count].position.en_passant;
            castle: move_stack.moves[move_stack.count].position.castle;
            hash_key: move_stack.moves[move_stack.count].position.hash_key;
            fifty: move_stack.moves[move_stack.count].position.fifty;
            king_square: JSON.parse(JSON.stringify(move_stack.moves[move_stack.count].position.king_square))
            draw_board();
            update_board();
        }
    }

    function first_move() {
        try {
            move_stack.count = 0;
            board = JSON.parse(JSON.stringify(move_stack.moves[move_stack.count].position.board));
            side = move_stack.moves[move_stack.count].position.side;
            en_passant: move_stack.moves[move_stack.count].position.en_passant;
            castle: move_stack.moves[move_stack.count].position.castle;
            hash_key: move_stack.moves[move_stack.count].position.hash_key;
            fifty: move_stack.moves[move_stack.count].position.fifty;
            king_square: JSON.parse(JSON.stringify(move_stack.moves[move_stack.count].position.king_square))
            draw_board();
            update_board();
        }

        catch(e) {}
    }

    function last_move() {
        try {
            move_stack.count = move_stack.size - 1;
            board = JSON.parse(JSON.stringify(move_stack.moves[move_stack.count].position.board));
            side = move_stack.moves[move_stack.count].position.side;
            en_passant: move_stack.moves[move_stack.count].position.en_passant;
            castle: move_stack.moves[move_stack.count].position.castle;
            hash_key: move_stack.moves[move_stack.count].position.hash_key;
            fifty: move_stack.moves[move_stack.count].position.fifty;
            king_square: JSON.parse(JSON.stringify(move_stack.moves[move_stack.count].position.king_square))
            draw_board();
            update_board();
        }

        catch(e) {}
    }



    function encode_move(source, target, piece, capture, pawn, enpassant, castling) {
        return (source) |
            (target << 7) |
            (piece << 14) |
            (capture << 18) |
            (pawn << 19) |
            (enpassant << 20) |
            (castling << 21)
    }
    function get_move_source(move) { return move & 0x7f }
    function get_move_target(move) { return (move >> 7) & 0x7f }
    function get_move_piece(move) { return (move >> 14) & 0xf }
    function get_move_capture(move) { return (move >> 18) & 0x1 }
    function get_move_pawn(move) { return (move >> 19) & 0x1 }
    function get_move_enpassant(move) { return (move >> 20) & 0x1 }
    function get_move_castling(move) { return (move >> 21) & 0x1 }
    function is_square_attacked(square, side) {
        if (!side) {
            if (!((square + 17) & 0x88) && (board[square + 17] == P))
                return 1;
            if (!((square + 15) & 0x88) && (board[square + 15] == P))
                return 1;
        }

        else {
            if (!((square - 17) & 0x88) && (board[square - 17] == p))
                return 1;
            if (!((square - 15) & 0x88) && (board[square - 15] == p))
                return 1;
        }
        for (var index = 0; index < 8; index++) {
            var target_square = square + knight_offsets[index];
            var target_piece = board[target_square];
            if (!(target_square & 0x88)) {
                if (!side ? target_piece == N : target_piece == n)
                    return 1;
            }
        }
        for (var index = 0; index < 8; index++) {
            var target_square = square + king_offsets[index];
            var target_piece = board[target_square];
            if (!(target_square & 0x88)) {
                if (!side ? target_piece == K : target_piece == k)
                    return 1;
            }
        }
        for (var index = 0; index < 4; index++) {
            var target_square = square + bishop_offsets[index];
            while (!(target_square & 0x88)) {
                var target_piece = board[target_square];
                if (!side ? (target_piece == B || target_piece == Q) : (target_piece == b || target_piece == q))
                    return 1;
                if (target_piece)
                    break;
                target_square += bishop_offsets[index];
            }
        }
        for (var index = 0; index < 4; index++) {
            var target_square = square + rook_offsets[index];
            while (!(target_square & 0x88)) {
                var target_piece = board[target_square];
                if (!side ? (target_piece == R || target_piece == Q) : (target_piece == r || target_piece == q))
                    return 1;
                if (target_piece)
                    break;
                target_square += rook_offsets[index];
            }
        }

        return 0;
    }

    function print_attacked_squares(side) {
        var attack_string = '  ' + (!side ? 'White' : 'Black') + ' attacks\n\n';
        for (var rank = 0; rank < 8; rank++) {
            for (var file = 0; file < 16; file++) {
                var square = rank * 16 + file;
                if (file == 0)
                    attack_string += (8 - rank).toString() + ' ';
                if (!(square & 0x88))
                    attack_string += (is_square_attacked(square, side) ? 'x ' : '. ');
            }
            attack_string += '\n';
        }
        attack_string += '  a b c d e f g h\n\n';
        console.log(attack_string);
    }

    function add_move(move_list, move) {
        move_list.moves[move_list.count] = move;
        move_list.count++;
    }
    function generate_moves(move_list) {
        for (var square = 0; square < 128; square++) {
            if (!(square & 0x88)) {
                if (!side) {
                    if (board[square] == P) {
                        var to_square = square - 16;
                        if (!(to_square & 0x88) && !board[to_square]) {
                            if (square >= a7 && square <= h7) {
                                add_move(move_list, encode_move(square, to_square, Q, 0, 0, 0, 0));
                                add_move(move_list, encode_move(square, to_square, R, 0, 0, 0, 0));
                                add_move(move_list, encode_move(square, to_square, B, 0, 0, 0, 0));
                                add_move(move_list, encode_move(square, to_square, N, 0, 0, 0, 0));
                            }
                            else {
                                add_move(move_list, encode_move(square, to_square, 0, 0, 0, 0, 0));
                                if ((square >= a2 && square <= h2) && !board[square - 32])
                                    add_move(move_list, encode_move(square, square - 32, 0, 0, 1, 0, 0));
                            }
                        }

                        for (var index = 0; index < 4; index++) {
                            var pawn_offset = bishop_offsets[index];
                            if (pawn_offset < 0) {
                                var to_square = square + pawn_offset;
                                if (!(to_square & 0x88)) {
                                    if (
                                        (square >= a7 && square <= h7) &&
                                        (board[to_square] >= 7 && board[to_square] <= 12)
                                    ) {
                                        add_move(move_list, encode_move(square, to_square, Q, 1, 0, 0, 0));
                                        add_move(move_list, encode_move(square, to_square, R, 1, 0, 0, 0));
                                        add_move(move_list, encode_move(square, to_square, B, 1, 0, 0, 0));
                                        add_move(move_list, encode_move(square, to_square, N, 1, 0, 0, 0));
                                    }

                                    else {
                                        if (board[to_square] >= 7 && board[to_square] <= 12)
                                            add_move(move_list, encode_move(square, to_square, 0, 1, 0, 0, 0));
                                        if (to_square == enpassant)
                                            add_move(move_list, encode_move(square, to_square, 0, 1, 0, 1, 0));
                                    }
                                }
                            }
                        }
                    }

                    if (board[square] == K) {
                        if (castle & QC) {
                            if (!board[f1] && !board[g1] && !board[e1]) {
                                if (!is_square_attacked(e1, black) && !is_square_attacked(f1, black))
                                    add_move(move_list, encode_move(d1, g1, 0, 0, 0, 0, 1));
                            }
                        }

                        if (castle & KC) {
                            if ( !board[b1] && !board[c1] ) {
                                if (!is_square_attacked(d1, black) && !is_square_attacked(c1, black))
                                    add_move(move_list, encode_move(d1, b1, 0, 0, 0, 0, 1));
                            }
                        }
                    }
                }

                else
                {
                    if (board[square] == p) {
                        var to_square = square + 16;
                        if (!(to_square & 0x88) && !board[to_square]) {
                            if (square >= a2 && square <= h2) {
                                add_move(move_list, encode_move(square, to_square, q, 0, 0, 0, 0));
                                add_move(move_list, encode_move(square, to_square, r, 0, 0, 0, 0));
                                add_move(move_list, encode_move(square, to_square, b, 0, 0, 0, 0));
                                add_move(move_list, encode_move(square, to_square, n, 0, 0, 0, 0));
                            }

                            else {
                                add_move(move_list, encode_move(square, to_square, 0, 0, 0, 0, 0));
                                if ((square >= a7 && square <= h7) && !board[square + 32])
                                    add_move(move_list, encode_move(square, square + 32, 0, 0, 1, 0, 0));
                            }
                        }
                        for (var index = 0; index < 4; index++)
                        {
                            var pawn_offset = bishop_offsets[index];
                            if (pawn_offset > 0)
                            {
                                var to_square = square + pawn_offset;
                                if (!(to_square & 0x88)) {
                                    if (
                                        (square >= a2 && square <= h2) &&
                                        (board[to_square] >= 1 && board[to_square] <= 6)
                                    ) {
                                        add_move(move_list, encode_move(square, to_square, q, 1, 0, 0, 0));
                                        add_move(move_list, encode_move(square, to_square, r, 1, 0, 0, 0));
                                        add_move(move_list, encode_move(square, to_square, b, 1, 0, 0, 0));
                                        add_move(move_list, encode_move(square, to_square, n, 1, 0, 0, 0));
                                    }

                                    else {
                                        if (board[to_square] >= 1 && board[to_square] <= 6)
                                            add_move(move_list, encode_move(square, to_square, 0, 1, 0, 0, 0));
                                        if (to_square == enpassant)
                                            add_move(move_list, encode_move(square, to_square, 0, 1, 0, 1, 0));
                                    }
                                }
                            }
                        }
                    }
                    if (board[square] == k) {
                        if (castle & kc) {
                            if (!board[f8] && !board[g8]) {
                                if (!is_square_attacked(e8, white) && !is_square_attacked(f8, white))
                                    add_move(move_list, encode_move(e8, g8, 0, 0, 0, 0, 1));
                            }
                        }
                        if (castle & qc) {
                            if (!board[d8] && !board[b8] && !board[c8])
                            {
                                if (!is_square_attacked(e8, white) && !is_square_attacked(d8, white))
                                    add_move(move_list, encode_move(e8, c8, 0, 0, 0, 0, 1));
                            }
                        }
                    }
                }
                if (!side ? board[square] == N : board[square] == n) {
                    for (var index = 0; index < 8; index++) {
                        var to_square = square + knight_offsets[index];
                        var piece = board[to_square];
                        if (!(to_square & 0x88)) {
                            if (
                                !side ?
                                    (!piece || (piece >= 7 && piece <= 12)) :
                                    (!piece || (piece >= 1 && piece <= 6))
                            ) {
                                if (piece)
                                    add_move(move_list, encode_move(square, to_square, 0, 1, 0, 0, 0));
                                else
                                    add_move(move_list, encode_move(square, to_square, 0, 0, 0, 0, 0));
                            }
                        }
                    }
                }
                if (!side ? board[square] == K : board[square] == k) {
                    for (var index = 0; index < 8; index++) {
                        var to_square = square + king_offsets[index];
                        var piece = board[to_square];
                        if (!(to_square & 0x88)) {
                            if (
                                !side ?
                                    (!piece || (piece >= 7 && piece <= 12)) :
                                    (!piece || (piece >= 1 && piece <= 6))
                            ) {
                                if (piece)
                                    add_move(move_list, encode_move(square, to_square, 0, 1, 0, 0, 0));
                                else
                                    add_move(move_list, encode_move(square, to_square, 0, 0, 0, 0, 0));
                            }
                          }
                    }
                }
                if (
                    !side ?
                        (board[square] == B) || (board[square] == Q) :
                        (board[square] == b) || (board[square] == q)
                ) {
                    for (var index = 0; index < 4; index++) {
                        var to_square = square + bishop_offsets[index];
                        while (!(to_square & 0x88)) {
                            var piece = board[to_square];
                            if (!side ? (piece >= 1 && piece <= 6) : ((piece >= 7 && piece <= 12)))
                                break;
                            if (!side ? (piece >= 7 && piece <= 12) : ((piece >= 1 && piece <= 6))) {
                                add_move(move_list, encode_move(square, to_square, 0, 1, 0, 0, 0));
                                break;
                            }
                            if (!piece)
                                add_move(move_list, encode_move(square, to_square, 0, 0, 0, 0, 0));
                            to_square += bishop_offsets[index];
                        }
                    }
                }

                if (!side ? (board[square] == R) || (board[square] == Q) : (board[square] == r) || (board[square] == q))
                {
                    for (var index = 0; index < 4; index++) {
                        var to_square = square + rook_offsets[index];
                        while (!(to_square & 0x88)) {
                            var piece = board[to_square];
                            if (!side ? (piece >= 1 && piece <= 6) : ((piece >= 7 && piece <= 12)))
                                break;
                            if (!side ? (piece >= 7 && piece <= 12) : ((piece >= 1 && piece <= 6))) {
                                add_move(move_list, encode_move(square, to_square, 0, 1, 0, 0, 0));
                                break;
                            }
                            if (!piece)
                                add_move(move_list, encode_move(square, to_square, 0, 0, 0, 0, 0));
                            to_square += rook_offsets[index];
                        }
                    }
                }
            }
        }
    }
    const all_moves = 0;
    const only_captures = 1;
    function make_move(move, capture_flag) {
        if (capture_flag == all_moves) {
            var board_copy, king_square_copy, side_copy, enpassant_copy, castle_copy, fifty_copy, hash_copy;
            board_copy = JSON.parse(JSON.stringify(board));
            side_copy = side;
            enpassant_copy = enpassant;
            castle_copy = castle;
            hash_copy = hash_key;
            fifty_copy = fifty;
            king_square_copy = JSON.parse(JSON.stringify(king_square));

            var from_square = get_move_source(move);
            var to_square = get_move_target(move);
            var promoted_piece = get_move_piece(move);
            var enpass = get_move_enpassant(move);
            var double_push = get_move_pawn(move);
            var castling = get_move_castling(move);
            var piece = board[from_square];
            var captured_piece = board[to_square];

            board[to_square] = board[from_square];
            board[from_square] = e;

            hash_key ^= piece_keys[piece * 128 + from_square];
            hash_key ^= piece_keys[piece * 128 + to_square];
            fifty++;

            if (board[from_square] == P || board[from_square] == p)
                fifty = 0;
            if (get_move_capture(move)) {
                if (captured_piece)
                    hash_key ^= piece_keys[captured_piece * 128 + to_square];
                fifty = 0;
            }

            if (promoted_piece) {
                if (side == white)
                    hash_key ^= piece_keys[P * 128 + to_square];
                else
                    hash_key ^= piece_keys[p * 128 + to_square];
                board[to_square] = promoted_piece;
                hash_key ^= piece_keys[promoted_piece * 128 + to_square];
            }
            if (enpass) {
                if (side == white) {
                    board[to_square + 16] = e;
                    hash_key ^= piece_keys[p * 128 + to_square + 16];
                }
                else {
                    board[to_square - 16] = e;
                    hash_key ^= piece_keys[(P * 128) + (to_square - 16)];
                }
            }
            if (enpassant != no_sq) hash_key ^= piece_keys[enpassant];
            enpassant = no_sq;
            if (double_push) {
                if (side == white) {
                    enpassant = to_square + 16;
                    hash_key ^= piece_keys[to_square + 16];
                }
                else {
                    enpassant = to_square - 16;
                    hash_key ^= piece_keys[to_square - 16];
                }
            }

            if (castling) {
                switch(to_square) {
                    case g1:
                        board[f1] = board[h1];
                        board[h1] = e;
                        hash_key ^= piece_keys[R * 128 + h1];
                        hash_key ^= piece_keys[R * 128 + f1];
                        break;
                    case b1:
                        board[c1] = board[a1];
                        board[a1] = e;
                        hash_key ^= piece_keys[R * 128 + a1];
                        hash_key ^= piece_keys[R * 128 + c1];
                        break;

                    case g8:
                        board[f8] = board[h8];
                        board[h8] = e;
                        hash_key ^= piece_keys[r * 128 + h8];
                        hash_key ^= piece_keys[r * 128 + f8];
                        break;
                    case c8:
                        board[d8] = board[a8];
                        board[a8] = e;
                        hash_key ^= piece_keys[r * 128 + a8];
                        hash_key ^= piece_keys[r * 128 + d8];
                        break;
                }
            }
            if (board[to_square] == K || board[to_square] == k)
                king_square[side] = to_square;
            hash_key ^= castle_keys[castle];
            castle &= castling_rights[from_square];
            castle &= castling_rights[to_square];
            side ^= 1;
            hash_key ^= side_key;

            if (is_square_attacked(!side ? king_square[side ^ 1] : king_square[side ^ 1], side)) {
                board = JSON.parse(JSON.stringify(board_copy));
                side = side_copy;
                enpassant = enpassant_copy;
                castle = castle_copy;
                hash_key = hash_copy;
                king_square = JSON.parse(JSON.stringify(king_square_copy));
                alert("check mate!");
                return 0;


            }
            else
                return 1;
        }
        else {
            if (get_move_capture(move))
                make_move(move, all_moves);

            else
                return 0;
        }

        return 1;
    }

    var nodes = 0;
    function perft_driver(depth)
    {
        if  (!depth) {
            nodes++;
            return;
        }
        var move_list = {
            moves: new Array(256),
            count: 0
        }
        generate_moves(move_list);
        for (var move_count = 0; move_count < move_list.count; move_count++) {
            var board_copy, king_square_copy, side_copy, enpassant_copy, castle_copy, fifty_copy, hash_copy;
            board_copy = JSON.parse(JSON.stringify(board));
            side_copy = side;
            enpassant_copy = enpassant;
            castle_copy = castle;
            fifty_copy = fifty;
            hash_copy = hash_key;
            king_square_copy = JSON.parse(JSON.stringify(king_square));

            if (!make_move(move_list.moves[move_count], all_moves))
                continue;
            perft_driver(depth - 1);

            board = JSON.parse(JSON.stringify(board_copy));
            side = side_copy;
            enpassant = enpassant_copy;
            castle = castle_copy;
            hash_key = hash_copy;
            fifty = fifty_copy;
            king_square = JSON.parse(JSON.stringify(king_square_copy));
        }
    }
    function perft_test(depth)
    {
        console.log('Performance test:\n\n');
        result_string = '';
        var start_time = new Date().getTime();
        var move_list = {
            moves: new Array(256),
            count: 0
        }
        generate_moves(move_list);
        for (var move_count = 0; move_count < move_list.count; move_count++)
        {
            var board_copy, king_square_copy, side_copy, enpassant_copy, castle_copy, fifty_copy, hash_copy;
            board_copy = JSON.parse(JSON.stringify(board));
            side_copy = side;
            enpassant_copy = enpassant;
            castle_copy = castle;
            hash_copy = hash_key;
            fifty_copy = fifty;
            king_square_copy = JSON.parse(JSON.stringify(king_square));

            if (!make_move(move_list.moves[move_count], all_moves))
                continue;

            var cum_nodes = nodes;
            perft_driver(depth - 1);
            var old_nodes = nodes - cum_nodes;

            board = JSON.parse(JSON.stringify(board_copy));
            side = side_copy;
            enpassant = enpassant_copy;
            castle = castle_copy;
            hash_key = hash_copy;
            fifty = fifty_copy;
            king_square = JSON.parse(JSON.stringify(king_square_copy));

            console.log(  'move' +
                ' ' + (move_count + 1) + ': ' +
                coordinates[get_move_source(move_list.moves[move_count])] +
                coordinates[get_move_target(move_list.moves[move_count])] +
                (get_move_piece(move_list.moves[move_count]) ?
                    promoted_pieces[get_move_piece(move_list.moves[move_count])]: ' ') +
                '    nodes: ' + old_nodes + '\n');
        }

        result_string += '\nDepth: ' + depth;
        result_string += '\nNodes: ' + nodes;
        result_string += '\n Time: ' + (new Date().getTime() - start_time) + ' ms';
        console.log(result_string);
    }

    function set_fen(fen) {
        reset_board();
        var index = 0;
        for (var rank = 0; rank < 8; rank++) {
            for (var file = 0; file < 16; file++) {
                var square = rank * 16 + file;
                if ((square & 0x88) == 0) {
                    if ((fen[index].charCodeAt() >= 'a'.charCodeAt() &&
                            fen[index].charCodeAt() <= 'z'.charCodeAt()) ||
                        (fen[index].charCodeAt() >= 'A'.charCodeAt() &&
                            fen[index].charCodeAt() <= 'Z'.charCodeAt())) {
                        if (fen[index] == 'K')
                            king_square[white] = square;

                        else if (fen[index] == 'k')
                            king_square[black] = square;
                        board[square] = char_pieces[fen[index]];
                        index++;
                    }

                    if (fen[index].charCodeAt() >= '0'.charCodeAt() &&
                        fen[index].charCodeAt() <= '9'.charCodeAt()) {
                        var offset = fen[index] - '0';
                        if (!(board[square]))
                            file--;
                        file += offset;
                        index++;
                    }
                    if (fen[index] == '/')
                        index++;
                }
            }
        }
        index++;
        side = (fen[index] == 'w') ? white : black;
        index += 2;
        while (fen[index] != ' ') {
            switch(fen[index]) {
                case 'K': castle |= KC; break;
                case 'Q': castle |= QC; break;
                case 'k': castle |= kc; break;
                case 'q': castle |= qc; break;
                case '-': break;
            }
            index++;
        }
        index++;
        if (fen[index] != '-') {
            var file = fen[index].charCodeAt() - 'a'.charCodeAt();
            var rank = 8 - (fen[index + 1].charCodeAt() - '0'.charCodeAt());
            enpassant = rank * 16 + file;
        }

        else enpassant = no_sq;

        fifty = Number(fen.slice(index, fen.length - 1).split(' ')[1]);
        hash_key = generate_hash_key();
        update_board();
    }

    function is_valid(move_str) {
        var move_list = {
            moves: new Array(),
            count: 0
        }

        generate_moves(move_list);
        var parse_from = (move_str[0].charCodeAt() - 'a'.charCodeAt()) + (8 - (move_str[1].charCodeAt() - '0'.charCodeAt())) * 16;
        var parse_to = (move_str[2].charCodeAt() - 'a'.charCodeAt()) + (8 - (move_str[3].charCodeAt() - '0'.charCodeAt())) * 16;
        var prom_piece = 0;

        var move;
        for(var count = 0; count < move_list.count; count++) {
            move = move_list.moves[count];
            if(get_move_source(move) == parse_from && get_move_target(move) == parse_to) {
                prom_piece = get_move_piece(move);
                if(prom_piece) {
                    if((prom_piece == N || prom_piece == n) && move_str[4] == 'n')
                        return move;

                    else if((prom_piece == B || prom_piece == b) && move_str[4] == 'b')
                        return move;

                    else if((prom_piece == R || prom_piece == r) && move_str[4] == 'r')
                        return move;

                    else if((prom_piece == Q || prom_piece == q) && move_str[4] == 'q')
                        return move;

                    continue;
                }
                return move;
            }
        }
        return 0;
    }


    var LIGHT_SQUARE = '#fff1f1';
    var DARK_SQUARE = '#6c6161';
    var SELECT_COLOR = 'grey';
    var CELL_WIDTH =60;
    var CELL_HEIGHT =60;

    if (width) {
        CELL_WIDTH = width / 8;
        CELL_HEIGHT = width / 8;
    }

    if (light_square) LIGHT_SQUARE = light_square;
    if (dark_square) DARK_SQUARE = dark_square;
    if (select_color) SELECT_COLOR = select_color;

    draw_board();
    update_board();

    var click_lock = 0;
    var user_source, user_target;

    function draw_board() {
        var chess_board = '<table style="border: 7px solid saddlebrown">';
        for (var row = 0; row < 8; row++) {
            chess_board += '<tr>'
            for (var col = 0; col < 16; col++) {
                var square = row * 16 + col;

                if (!(square & 0x88))
                    chess_board += '<td  id="' + square +
                        '"bgcolor="' + ( ((col + row) % 2) ? DARK_SQUARE : LIGHT_SQUARE) +
                        '" width="' + CELL_WIDTH + '" height="' + CELL_HEIGHT +
                        '" onclick="board.make_move(this.id)" ' +
                        'ondragstart="board.drag_piece(event, this.id)" ' +
                        'ondragover="board.drag_over(event, this.id)"'+
                        'ondrop="board.drop_piece(event, this.id)"' +
                        '></td>'
            }
            chess_board += '</tr>'
        }
        chess_board += '</table>';
        document.getElementById('chessboard').innerHTML = chess_board;
    }
    function update_board() {
        for (var row = 0; row < 8; row++) {
            for (var col = 0; col < 16; col++) {
                var square = row * 16 + col;
                if ((square & 0x88) == 0)
                    document.getElementById(square).innerHTML = '<img style="width: ' +
                        (width ? width / 8: 400 / 8) +
                        'px" draggable="true"  id="' +
                        board[square] + '" src ="image/' +
                        (board[square]) +'.gif">';
            }
        }
    }
    function drag_piece(event, square) {
        user_source = square;
    }
    function drag_over(event, square) {
        event.preventDefault();
        if (square == user_source)
            event.target.src = 'Images/0.gif';
    }
    function drop_piece(event, square) {
        user_target = square;
        move_piece(square);

        if (board[square])
            document.getElementById(square).style.backgroundColor = SELECT_COLOR;

        event.preventDefault();
    }

    function tap_piece(square) {
        draw_board();
        update_board();

        if (board[square])
            document.getElementById(square).style.backgroundColor = SELECT_COLOR;

        var click_square = parseInt(square, 10)
        if(!click_lock && board[click_square]) {
            user_source = click_square;
            click_lock ^= 1;
        }
        else if(click_lock) {
            user_target = click_square;
            move_piece(square);
        }
    }

    function move_piece(square) {
        var promoted_piece = Q;
        let move_str = coordinates[user_source] +
            coordinates[user_target] +
            promoted_pieces[promoted_piece];

        var valid_move  = is_valid(move_str);

        if (valid_move) {
            if (move_stack.count == 0) push_move(valid_move);

            make_move(valid_move, all_moves);
            push_move(valid_move);
            update_board();
        }

        draw_board();
        if (board[user_target])
            document.getElementById(user_target).style.backgroundColor = SELECT_COLOR;
        update_board();
        click_lock = 0;
    }

    (function init_all() {
        init_random_keys();
        hash_key = generate_hash_key();

    }())


    function tests() {
        set_fen('r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1 ');
        print_board();

        var move_list = {
            moves: new Array(256),
            count: 0
        }
        generate_moves(move_list);
        print_move_list(move_list);
        console.log(move_stack)
        print_attacked_squares(side);
    }

    return {

        make_move: function(square) { tap_piece(square); },
        drag_piece: function(event, square) { drag_piece(event, square); },
        drag_over: function(event, square) { drag_over(event, square); },
        drop_piece: function(event, square) { drop_piece(event, square); },
        set_fen: function(fen) { return set_fen(fen); },
        undo_move: function() { undo_move(); },
        redo_move: function() { redo_move(); },
        first_move: function() { first_move(); },
        last_move: function() { last_move(); },
        read_moves: function(moves) { read_moves(moves); },
        print_board: function() { print_board() },
        tests: function() { return tests(); }
    }
}
