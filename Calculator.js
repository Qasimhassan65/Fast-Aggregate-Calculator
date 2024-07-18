$(document).ready(function() {
    $('#step2').hide();
    $('#step2-matric').hide();
    $('#step2-ibcc').hide();
    $('#step2-olevel').hide();
    $('#step3').hide();

    var nuTestScore = 0;

    $('#nextStep').click(function() {
        nuTestScore = parseFloat($('#nuTestScore').val());

        if (isNaN(nuTestScore) || nuTestScore < 0 || nuTestScore > 120) {
            alert('Please enter a valid NU Test Score between 0 and 120.');
            return;
        }

        $('#nuTestScoreDisplay').text(nuTestScore);

        $('#step1').hide();
        $('#step2').show();
    });

    $('#calculateAggregate').click(function() {
        var markType = $("input[name='markType']:checked").val();

        if (!markType) {
            alert('Please select Matric Marks, IBCC O-Level Equivalency Marks, or O-Level Grades.');
            return;
        }

        if (markType === 'matric') {
            $('#step2').hide();
            $('#step2-matric').show();
        } else if (markType === 'ibcc') {
            $('#step2').hide();
            $('#step2-ibcc').show();
        } else if (markType === 'olevel') {
            $('#step2').hide();
            $('#step2-olevel').show();
        }
    });

    $('#showAggregate').click(function() {
        var matricScore = parseFloat($('#matricScore').val());

        if (isNaN(matricScore) || matricScore < 0 || matricScore > 1100) {
            alert('Please enter a valid Matric Marks between 0 and 1100.');
            return;
        }

        var markspercentage = calculateAggregateFromMatric(matricScore);

        displayAggregate(nuTestScore, markspercentage);
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });

    $('#showAggregateIBCC').click(function() {
        var ibccScore = parseFloat($('#ibccScore').val());

        if (isNaN(ibccScore) || ibccScore < 0 || ibccScore > 100) {
            alert('Please enter a valid IBCC O-Level Equivalency Marks between 0 and 100.');
            return;
        }

        var markspercentage = calculateAggregateFromIBCC(ibccScore);

        displayAggregate(nuTestScore, markspercentage);
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });

    $('#showAggregateOlevel').click(function() {
        var english = $('#english').val();
        var urdu = $('#urdu').val();
        var pakStudies = $('#pakStudies').val();
        var islamiyat = $('#islamiyat').val();
        var mathematics = $('#mathematics').val();
        var elective1 = $('#elective1').val();
        var elective2 = $('#elective2').val();
        var elective3 = $('#elective3').val();

        // Validate each input field for O-level grades
        var validInputs = true;
        [english, urdu, pakStudies, islamiyat, mathematics, elective1, elective2, elective3].forEach(function(input) {
            if (!input || (input !== 'A*' && input !== 'A' && input !== 'B' && input !== 'C' && input !== 'D' && input !== 'E')) {
                validInputs = false;
                return;
            }
        });

        if (!validInputs) {
            alert('Please enter valid O-Level grades (A*, A, B, C, D, E) for all subjects.');
            return;
        }

        var markspercentage = calculateAggregateFromOlevel(english, urdu, pakStudies, islamiyat, mathematics, elective1, elective2, elective3);
        displayAggregate(nuTestScore, markspercentage);

        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });

    function calculateAggregateFromMatric(matricScore) {
        return (matricScore / 1100) * 100; 
    }

    function calculateAggregateFromIBCC(ibccScore) {
        return ibccScore;
    }
                    
    function calculateAggregateFromOlevel(english, urdu, pakStudies, islamiyat, mathematics, elective1, elective2, elective3) {
        function gradeToMarks(subject, grade) {
            switch (grade) {
                case 'A*':
                    return Astarmarks(subject);
                case 'A':
                    return 85;
                case 'B':
                    return 75;
                case 'C':
                    return 65;
                case 'D':
                    return 55;
                case 'E':
                    return 45;
                default:
                    return 0;
            }
        }
    
        function Astarmarks(subject) {
            switch (subject) {
                case 'mathematics':
                    return 95;
                case 'urdu':
                    return 93;
                case 'islamiyat':
                    return 95;
                default:
                    return 90;
            }
        }
    
        var totalMarks = gradeToMarks('english', english) +
                         gradeToMarks('urdu', urdu) +
                         gradeToMarks('pakStudies', pakStudies) +
                         gradeToMarks('islamiyat', islamiyat) +
                         gradeToMarks('mathematics', mathematics) +
                         gradeToMarks('elective1', elective1) +
                         gradeToMarks('elective2', elective2) +
                         gradeToMarks('elective3', elective3);
    
        var percentage = (totalMarks / 800) * 100;
    
        return percentage;
    }

    function displayAggregate(nuTestScore, marks) {
        var totalAggregate = ((nuTestScore/120)* 0.5) + (marks * 0.5);
        $('.score').text(totalAggregate.toFixed(2)); 

        $('#step2-matric').hide();
        $('#step2-ibcc').hide();
        $('#step2-olevel').hide();

        $('#step3').show();
    }
});
