function MyRenderer(params) {
    return (
          <span className="my-renderer">
            <img src="https://d1yk6z6emsz7qy.cloudfront.net/static/images/loading.gif" className="my-spinner"/>
              {params.value}
          </span>
    );
}

function GridExample() {

    // never changes, so we can use useMemo
    const modules = useMemo( ()=> [ClientSideRowModelModule, RangeSelectionModule, RowGroupingModule, RichSelectModule], []);

    // never changes, so we can use useMemo
    const columnDefs = useMemo( ()=> [
        { field: 'athlete' },
        { field: 'age', cellRendererFramework: MyRenderer },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' }
    ], []);

    // never changes, so we can use useMemo
    const defaultColDef = useMemo( ()=> ({
        resizable: true,
        sortable: true
    }), []);

    // changes, needs to be state
    const [rowData, setRowData] = useState();

    // gets called once, no dependencies, loads the grid data
    useEffect( ()=> {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then( resp => resp.json())
            .then( data => setRowData(data));
    }, []);

    return (
        <AgGridReact 

            // turn on AG Grid React UI
            reactUi="true"

            // all other properties as normal...
            className="ag-theme-alpine"
            animateRows="true"
            modules={modules}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableRangeSelection="true"
            rowData={rowData}
            rowSelection="multiple"
            suppressRowClickSelection="true"
        />
    );
}

render(<GridExample></GridExample>, document.querySelector('#root'));