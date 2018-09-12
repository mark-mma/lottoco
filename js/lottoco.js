/**
Lottoco main client side number picking logic.

**/

Lottoco = function () {
    this.ticket_cost = 50;
    this.max_tickets = 5;
    this.current_grid = GRID_MAX
}

Lottoco.prototype.autoPick = function (e) {
    e.preventDefault();
    var selection = ""
    // Get the class for the input for this grid
    parent_table = $(this).closest('table').attr('id');
    grid_number = parent_table.split('grid_')[1]
    input_name = 'input[name=selected_lucky_numbers_grid'+grid_number+']'

    console.log("Auto picking selection.")
     $.ajax({
          method: "POST",
          url: SCRIPT_ROOT + '/autopick',
          data: JSON.stringify({'grid_number': grid_number, 'grid_number': grid_number}),
          contentType: 'application/json;charset=UTF-8',
          success: function (r) {
               console.log("Success", r, Object.keys(r).length)
               $.each(r, function(key,value) {selection=selection+value[0]+'*';})
               $(input_name).val(selection)
          }
     }).done(function( msg ) {
            console.log("Done with Ajax request")
     });
     return false
}

Lottoco.prototype.pickSingleDigit = function (e) {
    e.preventDefault();
    var selection = ""

    console.log("Picking selection.")
    selected_number = $(this).attr('id')
    selected_digit = selected_number.split('_grid')[0]

    grid_number = selected_number.split('_grid')[1]
    input_name = 'input[name=selected_lucky_numbers_grid'+grid_number+']'

    $.ajax({
          method: "POST",
          url: SCRIPT_ROOT + '/picknumber',
          data: JSON.stringify({'pick': selected_digit, 'grid_number': grid_number}),
          contentType: 'application/json;charset=UTF-8',
          success: function (r) {
               console.log("Success", r, Object.keys(r).length)
               $.each(r, function(key,value) {selection=selection+value[0]+'*';})
               $(input_name).val(selection)
          }
     }).done(function( msg ) {
            console.log("Done with Ajax request")
     });
     return false
}

Lottoco.prototype.pickPowerBallDigit = function (e) {
    e.preventDefault();
    var selection = ""

    console.log("Picking powerball selection.")
    selected_number = $(this).attr('id')
    selected_digit = selected_number.split('_powerball_grid')[0]

    grid_number = selected_number.split('_powerball_grid')[1]
    input_name = 'input[name=selected_lucky_numbers_grid'+grid_number+']'

    $.ajax({
          method: "POST",
          url: SCRIPT_ROOT + '/pickpowerball',
          data: JSON.stringify({'pick': selected_digit, 'grid_number': grid_number}),
          contentType: 'application/json;charset=UTF-8',
          success: function (r) {
               console.log("Success", r, Object.keys(r).length)
               if (r.error) {
                    $('.errors_p').text(r.message)
               } else {
                    $.each(r, function(key,value) {selection=selection+value[0]+'*';})
                    $(input_name).val(selection)
               }
          }
     }).done(function( msg ) {
            console.log("Done with Ajax request")
     });
     return false
}

Lottoco.prototype.clearSelection = function (e) {
    e.preventDefault();
    console.log("Clearing selection.")
    // Get the class for the input for this grid
    parent_table = $(this).closest('table').attr('id');
    grid_number = parent_table.split('grid_')[1]
    input_name = 'input[name=selected_lucky_numbers_grid'+grid_number+']'
    $(input_name).val('')

    $.ajax({
          method: "POST",
          url: SCRIPT_ROOT + '/clearselection',
          data: JSON.stringify({'grid_number': grid_number}),
          contentType: 'application/json;charset=UTF-8',
          success: function (r) {
               console.log("Success", r, Object.keys(r).length)
          }
     }).done(function( msg ) {
            console.log("Done with Ajax request")
     });
     return false
}

Lottoco.prototype.submitSelection = function (e) {
    e.preventDefault();
    console.log("Submitting selection.")
}

Lottoco.prototype.addTicket = function (e) {
    e.preventDefault();
    console.log("Adding  Ticket number." + lottoco.current_grid)
    // Tickets max GRID_NUMBER is 5, update current grid after action
    max_grid = lottoco.max_tickets
    current_grid = lottoco.current_grid
    next_grid = current_grid + 1
    last_dom_element_previous_grid = $('.errors_p_grid'+current_grid)

    cost_so_far = lottoco.ticket_cost * next_grid

    if (current_grid == max_grid) {
        console.log('Cannot exceed number of betslips '+ max_grid)
        last_dom_element_previous_grid.text('Cannot exceed number of betslips '+ max_grid)
        return
    }

    // The table grid to add to the DOM
    next_grid_html = `
        <h3>Grid Number `+next_grid+`</h3>
        <table id="grid_`+next_grid+`" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
            <tr>
                <td colspan="5" class="autopick">
                    <button class="autopick">Autopick</button>
                </td>
            </tr>
            <tr class="">
                <td class="clear" colspan="2">
                    <button class="clear_selection">clear</button>
                </td>
            </tr>
            <tr class="numbers">
                <td class="n " width="12.5%">
                    <button class="pick_single_digit" id="1_grid`+next_grid+`">1</button>
                </td>
                <td class="n" width="12.5%">
                    <button class="pick_single_digit" id="2_grid`+next_grid+`">2</button>
                </td>
                <td class="n" width="12.5%">
                    <button class="pick_single_digit" id="3_grid`+next_grid+`">3</button>
                </td>
                <td class="n" width="12.5%">
                    <button class="pick_single_digit" id="4_grid`+next_grid+`">4</button>
                </td>
                <td class="n" width="12.5%">
                    <button class="pick_single_digit" id="5_grid`+next_grid+`">5</button>
                </td>
                <td class="n" width="12.5%">
                    <button class="pick_single_digit" id="6_grid`+next_grid+`">6</button>
                </td>
                <td class="n" width="12.5%">
                    <button class="pick_single_digit" id="7_grid`+next_grid+`">7</button>
                </td>
                <td class="n" width="12.5%">
                    <button class="pick_single_digit" id="_grid`+next_grid+`">8</button>
                </td>
            </tr>
            <tr class="numbers">
                <td class="n " width="12.5%">
                    <button class="pick_single_digit" id="9_grid`+next_grid+`">9</button>
                </td>
                <td class="n" width="12.5%">
                    <button class="pick_single_digit" id="10_grid`+next_grid+`">10</button>
                </td>
                <td class="n" width="12.5%">
                    <button class="pick_single_digit" id="11_grid`+next_grid+`">11</button>
                </td>
                <td class="n" width="12.5%">
                    <button class="pick_single_digit" id="12_grid`+next_grid+`">12</button>
                </td>
                <td class="n" width="12.5%">
                    <button class="pick_single_digit" id="13_grid`+next_grid+`">13</button>
                </td>
                <td class="n" width="12.5%">
                    <button class="pick_single_digit" id="14_grid`+next_grid+`">14</button>
                </td>
                <td class="n" width="12.5%">
                    <button class="pick_single_digit" id="15_grid`+next_grid+`">15</button>
                </td>
                <td class="n" width="12.5%">
                    <button class="pick_single_digit" id="16_grid`+next_grid+`">16</button>
                </td>
            </tr>
            <tr class="numbers">
                <td class="n" width="12.5%">
                    <button id="17_grid`+next_grid+`" class="pick_single_digit">17
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="18_grid`+next_grid+`" class="pick_single_digit">18
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="19_grid`+next_grid+`" class="pick_single_digit">19
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="20_grid`+next_grid+`" class="pick_single_digit">20
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="21_grid`+next_grid+`" class="pick_single_digit">21
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="22_grid`+next_grid+`" class="pick_single_digit">22
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="23_grid`+next_grid+`" class="pick_single_digit">23
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="24_grid`+next_grid+`" class="pick_single_digit">24
                    </button>
                </td>
            </tr>
            <tr class="numbers">
                <td class="n" width="12.5%">
                    <button id="25_grid`+next_grid+`" class="pick_single_digit">
                        25
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="26_grid`+next_grid+`" class="pick_single_digit"
                    >26
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="27_grid`+next_grid+`" class="pick_single_digit"
                    >27
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="28_grid`+next_grid+`" class="pick_single_digit"
                    >28
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="29_grid`+next_grid+`" class="pick_single_digit"
                    >29
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="30_grid`+next_grid+`" class="pick_single_digit">
                        30
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="31_grid`+next_grid+`" class="pick_single_digit"
                    >31
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="32_grid`+next_grid+`" class="pick_single_digit"
                    >32
                    </button>
                </td>
            </tr>
            <tr class="numbers">
                <td class="n" width="12.5%">
                    <button id="33_grid`+next_grid+`" class="pick_single_digit">33
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="34_grid`+next_grid+`" class="pick_single_digit">34
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="35_grid`+next_grid+`" class="pick_single_digit">35
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="36_grid`+next_grid+`" class="pick_single_digit">36
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="37_grid`+next_grid+`" class="pick_single_digit">37
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="38_grid`+next_grid+`" class="pick_single_digit">38
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="39_grid`+next_grid+`" class="pick_single_digit">39
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="40_grid`+next_grid+`" class="pick_single_digit">40
                    </button>
                </td>
            </tr>
            <tr class="numbers">
                <td class="n" width="12.5%">
                    <button id="41_grid`+next_grid+`" class="pick_single_digit">41
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="42_grid`+next_grid+`" class="pick_single_digit">42
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="43_grid`+next_grid+`" class="pick_single_digit">43
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="44_grid`+next_grid+`" class="pick_single_digit">44
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="45_grid`+next_grid+`" class="pick_single_digit">45
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="46_grid`+next_grid+`" class="pick_single_digit">46
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="47_grid`+next_grid+`" class="pick_single_digit">47
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="48_grid`+next_grid+`" class="pick_single_digit">48
                    </button>
                </td>
                <td class="n" width="12.5%">
                    <button id="49_grid`+next_grid+`" class="pick_single_digit">49
                    </button>
                </td>
            </tr>
            <tr>
                <td><p>Choose Powerball</p></td>
            </tr>
            <tr class="numbers">
                <td class="n " width="12.5%">
                    <button class="pick_power_ball_grid`+next_grid+`" id="0_powerball">0</button>
                </td>
                <td class="n " width="12.5%">
                    <button id="1_powerball_grid`+next_grid+`" class="pick_power_ball">1</button>
                </td>
                <td class="n " width="12.5%">
                    <button id="2_powerball_grid`+next_grid+`" class="pick_power_ball">2</button>
                </td>
                <td class="n " width="12.5%">
                    <button id="3_powerball_grid`+next_grid+`" class="pick_power_ball">3</button>
                </td>
                <td class="n " width="12.5%">
                    <button id="4_powerball_grid`+next_grid+`" class="pick_power_ball">4</button>
                </td>
                <td class="n " width="12.5%">
                    <button id="5_powerball_grid`+next_grid+`" class="pick_power_ball">5</button>
                </td>
                <td class="n " width="12.5%">
                    <button id="6_powerball_grid`+next_grid+`" class="pick_power_ball">6</button>
                </td>
                <td class="n " width="12.5%">
                    <button id="7_powerball_grid`+next_grid+`" class="pick_power_ball">7</button>
                </td>
                <td class="n " width="12.5%">
                    <button id="8_powerball_grid`+next_grid+`" class="pick_power_ball">8</button>
                </td>
                <td class="n " width="12.5%">
                    <button id="9_powerball_grid`+next_grid+`" class="pick_power_ball">9</button>
                </td>
            </tr>
            </tbody>
    
        </table>
        <input id="selected_lucky_numbers_grid`+next_grid+`" name="selected_lucky_numbers_grid`+next_grid+`" type="text" value="">
    
        <p class="errors_p_grid`+next_grid+`">
        </p>
    `
    last_dom_element_previous_grid.after(next_grid_html)
    $('.total_cost').text("Total Cost. Ksh."+cost_so_far)
    lottoco.current_grid = next_grid
}

Lottoco.prototype.init = function () {
    console.log("Initializing the app...")
    $(document).on('click', '.clear_selection', this.clearSelection)
    $(document).on('click', '.autopick', this.autoPick)
    $(document).on('click', '.pick_single_digit', this.pickSingleDigit)
    $(document).on('click', '.pick_power_ball', this.pickPowerBallDigit)
    $(document).on('click', '.add_ticket', this.addTicket)
}

lottoco = new Lottoco()