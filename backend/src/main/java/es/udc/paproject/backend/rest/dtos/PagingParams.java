package es.udc.paproject.backend.rest.dtos;

public class PagingParams {

    private int page = 0;

    public PagingParams() {
    }

    public PagingParams(int page) {
        this.page = page;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }
}
