export function makeRowsSameHeight() {
    setTimeout(() => {
      if (
        document.getElementsByClassName('p-datatable-scrollable-wrapper').length
      ) {
        let wrapper = document.getElementsByClassName(
          'p-datatable-scrollable-wrapper'
        );
        for (var i = 0; i < wrapper.length; i++) {
          let w = wrapper.item(i) as HTMLElement;
          let frozen_rows: any = w.querySelectorAll(
            '.p-datatable-frozen-view tr'
          );
          let unfrozen_rows: any = w.querySelectorAll(
            '.p-datatable-unfrozen-view tr'
          );
          for (let i = 0; i < frozen_rows.length; i++) {
            if (frozen_rows[i].clientHeight > unfrozen_rows[i].clientHeight) {
              unfrozen_rows[i].style.height =
                frozen_rows[i].clientHeight + 'px';
            } else if (
              frozen_rows[i].clientHeight < unfrozen_rows[i].clientHeight
            ) {
              frozen_rows[i].style.height =
                unfrozen_rows[i].clientHeight + 'px';
            }
          }
        }
      }
    });
  }