import { Breadcrumb, BreadcrumbItem } from "reactstrap";

function Header(props) {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem active>{props.name}</BreadcrumbItem>
      </Breadcrumb>

      <h1>{props.title}</h1>
    </div>
  );
}

export default Header;
