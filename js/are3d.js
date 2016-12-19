_.are3d = _.bind(
    function () {
        var _$$ = this;
        var matrix = {
            eye: function () {
                return [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ];
            },
            translate: function (x, y, z) {
                return [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    x, y, z, 1
                ];
            },
            scale: function (x, y, z) {
                return [
                    x, 0, 0, 0,
                    0, y, 0, 0,
                    0, 0, z, 0,
                    0, 0, 0, 1
                ];
            },
            rotateX: function (a) {
                return [
                    1, 0, 0, 0,
                    0, Math.cos(a), Math.sin(a), 0,
                    0, -Math.sin(a), Math.cos(a), 0,
                    0, 0, 0, 1
                ];
            },
            rotateY: function (a) {
                return [
                    Math.cos(a), 0, -Math.sin(a), 0,
                    0, 1, 0, 0,
                    Math.sin(a), 0, Math.cos(a), 0,
                    0, 0, 0, 1
                ];
            },
            rotateZ: function (a) {
                return [
                    Math.cos(a), Math.sin(a), 0, 0,
                    -Math.sin(a), Math.cos(a), 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ];
            },
            rotate: function (v, a) {
                var x = v[0], y = v[1], z = v[2],
                    r = Math.sqrt(x * x + y * y + z * z), sina = Math.sin(a), cosa = Math.cos(a);
                x /= r;
                y /= r;
                z /= r;
                return [
                    1 + ( 1 - cosa ) * ( x * x - 1 ), z * sina + x * y * ( 1 - cosa ), -y * sina + x * z * ( 1 - cosa ), 0,
                    -z * sina + x * y * ( 1 - cosa ), 1 + ( 1 - cosa ) * ( y * y - 1 ), x * sina + y * z * ( 1 - cosa ), 0,
                    y * sina + x * z * ( 1 - cosa ), -x * sina + y * z * ( 1 - cosa ), 1 + ( 1 - cosa  ) * ( z * z - 1 ), 0,
                    0, 0, 0, 1
                ];
            },
            perspective: function (d) {
                return [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, -1 / d,
                    0, 0, 0, 1
                ];
            }
        };


        function combine() {
            return _.reduce(arguments, _$$.mul);
        }

        function origin(m, x, y, z) {
            return combine(matrix.translate(x, y, z), m, matrix.translate(-x, -y, -z));
        }

        function transform(m, v) {
            return _.map(_.range(4), function (i) {
                return m[i] * v[0] + m[i + 4] * v[1] + m[i + 8] * v[2] + m[i + 12] * v[3];
            });
        }

        return {
            matrix: matrix,
            combine: combine,
            origin: origin,
            transform: transform
        }
    },
    {
        mul: function (a, b) {
            for (var i = 0, arr = []; i < 4; ++i) {
                for (var j = 0; j < 4; ++j) {
                    arr[i * 4 + j] = 0;
                    for (var k = 0; k < 4; ++k) {
                        arr[i * 4 + j] += b[i * 4 + k] * a[k * 4 + j];
                    }
                }
            }
            return arr;
        }
    }
)();