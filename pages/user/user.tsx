import React from 'react';
import { Button, Grid, Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { BsDownload } from "react-icons/bs";

import { StyledBadge } from "../../icons/StyledBadge";
import { IconButton } from "../../icons/IconButton";
import { EyeIcon } from "../../icons/EyeIcon";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";

type UserType = {
  id: string | number,
  name?: string,
  email?: string,
  role?: string,
  team?: string,
  status: "online" | "offline" | "vacation",
  age?: string,
  avatar?: string,
};

function Users() {
  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const users: UserType[] = [
    { id: 1, name: "Tony Reichert", role: "CEO", team: "Management", status: "online", age: "29", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d", email: "tony.reichert@example.com", },
    { id: 2, name: "Zoey Lang", role: "Technical Lead", team: "Development", status: "offline", age: "25", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", email: "zoey.lang@example.com", },
    { id: 3, name: "Jane Fisher", role: "Senior Developer", team: "Development", status: "online", age: "22", avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d", email: "jane.fisher@example.com", },
    { id: 4, name: "William Howard", role: "Community Manager", team: "Marketing", status: "offline", age: "28", avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d", email: "william.howard@example.com", },
    { id: 5, name: "Kristen Copper", role: "Sales Manager", team: "Sales", status: "online", age: "24", avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d", email: "kristen.cooper@example.com", },
  ];

  const renderCell = (user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User squared src={user?.avatar} name={cellValue} css={{ p: 0 }} size="lg">
            {user?.email}
          </User>
        );
      case "role":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {user?.team}
              </Text>
            </Row>
          </Col>
        );
      case "status":
        return <StyledBadge type={user?.status ==='online'? 'active': 'paused'}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton onClick={() => console.log("View user", user?.id)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit user">
                <IconButton onClick={() => console.log("Edit user", user?.id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete user"
                color="error"
                onClick={() => console.log("Delete user", user?.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
    <>

      <div className="user-header">

        <div className="header">
          <h1>Users</h1>
        </div>

        <div className="header-control">
          <Grid.Container gap={2} justify="center">
            <Grid>
              <Button light color="secondary" auto>
                <BsDownload className='mx-3' /> Export
              </Button>
            </Grid>

            <Grid>
              <Button color="gradient" auto>
                Add user
              </Button>
            </Grid>
          </Grid.Container>
        </div>

      </div>

      <div className="search-user">
        <div className="input-container">
          <input type="text" placeholder='Search here...' spellCheck={false} />
        </div>
      </div>

      <div className="user-table">

        <Table aria-label="Example table with custom cells" css={{ height: "auto", minWidth: "100%" }} selectionMode="none" >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column key={column.uid} hideHeader={column.uid === "actions"} align={column.uid === "actions" ? "center" : "start"} >
                {column.name}
              </Table.Column>
            )}
          </Table.Header>

          <Table.Body items={users}>
            {(item: UserType) => (
              <Table.Row>
                {(columnKey) => (
                  <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>

      </div>

    </>
  )
}

export default Users